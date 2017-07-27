/*
 Copyright 2016-2017 Resin.io

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import * as Promise from 'bluebird';
import * as _ from 'lodash';
import * as request from 'request-promise';
import { DiscourseConnectionDetails, DiscourseEmitContext, DiscourseEvent } from '../../services/discourse-types';
import { MessageAction, MessageContext, MessageEvent, TransmitContext } from '../../services/messenger-types';
import * as Translator from './translator';

export class DiscourseTranslator implements Translator.Translator {
	private connectionDetails: DiscourseConnectionDetails;

	constructor(data: DiscourseConnectionDetails) {
		this.connectionDetails = data;
	}

	/**
	 * Translate the provided event, enqueued by the service, into a message context.
	 * @param event  Data in the form raw to the service.
	 */
	public eventIntoMessage(event: DiscourseEvent): Promise<MessageEvent> {
		// Encode once the common parts of a request
		const getGeneric = {
			json: true,
			method: 'GET',
			qs: {
				api_key: this.connectionDetails.token,
				api_username: this.connectionDetails.username,
			},
			// appended before execution
			uri: `https://${this.connectionDetails.instance}`,
		};
		// Gather more complete details of the enqueued event
		const getPost = _.cloneDeep(getGeneric);
		getPost.uri += `/posts/${event.rawEvent.id}`;
		const getTopic = _.cloneDeep(getGeneric);
		getTopic.uri += `/t/${event.rawEvent.topic_id}`;
		return Promise.props({
			post: request(getPost),
			topic: request(getTopic),
		})
		.then((details: {post: any, topic: any}) => {
			// Gather metadata and resolve
			const metadata = Translator.extractMetadata(details.post.raw);
			const first = details.post.post_number === 1;
			const rawEvent: MessageContext = {
				action: MessageAction.Create,
				first,
				genesis: metadata.genesis || event.source,
				// post_type 4 seems to correspond to whisper
				hidden: first ? !details.topic.visible : details.post.post_type === 4,
				source: event.source,
				sourceIds: {
					// These come in as integers, but should be strings
					flow: details.topic.category_id.toString(),
					message: details.post.id.toString(),
					thread: details.post.topic_id.toString(),
					url: getTopic.uri,
					user: details.post.username,
				},
				text: metadata.content,
				title: details.topic.title,
			};
			return {
				cookedEvent: {
					// TODO: This to use _serviceName and translate event.cookedEvent.type
					context: `discourse.${event.cookedEvent.context}`,
					event: 'message',
				},
				rawEvent,
				source: event.source,
			};
		});
	}

	/**
	 * Translate the provided message context into an emit context.
	 * @param message  Standard form of the message.
	 */
	public messageIntoEmitCreateMessage(message: TransmitContext): Promise<DiscourseEmitContext> {
		// Attempt to find the thread ID to know if this is a new topic or not
		const topicId = message.toIds.thread;
		if (!topicId) {
			const title = message.title;
			if (!title) {
				throw new Error('Cannot create Discourse Thread without a title');
			}
			// A new topic request for discourse
			return Promise.resolve({
				json: true,
				method: 'POST',
				path: '/posts',
				payload: {
					category: message.toIds.flow,
					raw: `${message.text}\n\n---\n${Translator.stringifyMetadata(message)}`,
					title,
					unlist_topic: message.hidden ? 'true' : 'false',
				},
			});
		}
		// A new message request for discourse
		return Promise.resolve({
			json: true,
			method: 'POST',
			path: '/posts',
			payload: {
				raw: `${message.text}\n\n---\n${Translator.stringifyMetadata(message)}`,
				topic_id: topicId,
				whisper: message.hidden ? 'true' : 'false',
			},
		});
	}

	/**
	 * Translate the provided message context into an emit context that will retrieve the thread history.
	 * @param message    Standard form of the message.
	 * @param shortlist  *DO NOT RELY ON THIS BEING USED.*  Purely optional optimisation.
	 *                   If the endpoint supports it then it may use this to shortlist the responses.
	 */
	public messageIntoEmitReadThread(message: MessageContext, shortlist?: RegExp): Promise<DiscourseEmitContext> {
		const firstWords = shortlist && shortlist.source.match(/^([\w\s]+)/i);
		if (firstWords) {
			return Promise.resolve({
				json: true,
				method: 'GET',
				qs: {
					'term': firstWords[1],
					'search_context[type]': 'topic',
					'search_context[id]': message.sourceIds.thread,
				},
				path: '/search/query',
			});
		}
		return Promise.resolve({
			json: true,
			method: 'GET',
			path: `/t/${message.sourceIds.thread}`,
		});
	}

	/**
	 * Translate the provided generic name for an event into the service events to listen to.
	 * @param name  Generic name for an event.
	 */
	public eventNameIntoTriggers(name: string): string[] {
		const equivalents: {[key: string]: string[]} = {
			message: ['post'],
		};
		return equivalents[name];
	}

	/**
	 * Returns an array of all the service events that may be translated.
	 */
	public getAllTriggers(): string[] {
		return ['post'];
	}
}

export function createTranslator(data: DiscourseConnectionDetails): Translator.Translator {
	return new DiscourseTranslator(data);
}
