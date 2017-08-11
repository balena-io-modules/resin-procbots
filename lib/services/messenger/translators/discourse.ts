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
import {
	DiscourseConnectionDetails, DiscourseEmitData,
	DiscourseEvent, DiscourseResponse
} from '../../discourse-types';
import { MessageContext, MessageEvent, MessageResponseData, TransmitContext } from '../../messenger-types';
import { DataHub } from '../datahubs/datahub';
import * as Translator from './translator';

export class DiscourseTranslator implements Translator.Translator {
	private hub: DataHub;
	private connectionDetails: DiscourseConnectionDetails;
	private eventEquivalencies: {[generic: string]: string[]} = {
		message: ['post'],
	};

	constructor(data: DiscourseConnectionDetails, hub: DataHub) {
		this.hub = hub;
		this.connectionDetails = data;
	}

	public eventTypeIntoMessageType(type: string): string {
		return _.findKey(this.eventEquivalencies, (value: string[]) => {
			return _.includes(value, type);
		}) || 'Misc event';
	}

	public messageTypeIntoEventTypes(type: string): string[] {
		return this.eventEquivalencies[type];
	}

	public getAllEventTypes(): string[] {
		return _.flatMap(this.eventEquivalencies, _.identity);
	}

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
				const metadata = Translator.extractMetadata(details.post.raw, 'img');
				const cookedEvent: MessageContext = {
					details: {
						genesis: metadata.genesis || event.source,
						// post_type 4 seems to correspond to whisper
						hidden: details.post.post_type === 4,
						internal: details.post.staff,
						text: metadata.content.trim(),
						title: details.topic.title,
					},
					source: {
						service: event.source,
						// These come in as integers, but should be strings
						flow: details.topic.category_id.toString(),
						message: details.post.id.toString(),
						thread: details.post.topic_id.toString(),
						url: getTopic.uri,
						username: details.post.username,
					},
				};
				return {
					context: `${event.source}.${event.cookedEvent.context}`,
					type: this.eventTypeIntoMessageType(event.type),
					cookedEvent,
					rawEvent: event.rawEvent,
					source: 'messenger',
				};
			});
	}

	public messageIntoConnectionDetails(message: TransmitContext): Promise<DiscourseConnectionDetails> {
		return this.hub.fetchValue(message.hubUsername, 'discourse', 'token')
			.then((token) => {
				return {
					token,
					username: message.target.username,
					instance: this.connectionDetails.instance,
				};
			});
	}

	public messageIntoEmitCreateComment(message: TransmitContext): {method: string[], payload: DiscourseEmitData} {
		// Attempt to find the thread ID to know if this is a new topic or not
		const topicId = message.target.thread;
		if (!topicId) {
			const title = message.details.title;
			if (!title) {
				throw new Error('Cannot create Discourse Thread without a title');
			}
			// A new topic request for discourse
			return {method: ['request'], payload: {
				method: 'POST',
				path: '/posts',
				body: {
					category: message.target.flow,
					raw: `${message.details.text}\n\n---\n${Translator.stringifyMetadata(message, 'img')}`,
					title,
					unlist_topic: 'false',
				},
			}};
		}
		// A new message request for discourse
		return {method: ['request'], payload: {
			method: 'POST',
			path: '/posts',
			body: {
				raw: `${message.details.text}\n\n---\n${Translator.stringifyMetadata(message, 'img')}`,
				topic_id: topicId,
				whisper: message.details.hidden ? 'true' : 'false',
			},
		}};
	}

	public responseIntoMessageResponse(_payload: TransmitContext, response: DiscourseResponse): MessageResponseData {
		return {
			message: response.id,
			thread: response.topic_id,
			url: `https://${this.connectionDetails.instance}/t/${response.topic_id}`
		};
	}
}

export function createTranslator(data: DiscourseConnectionDetails, hub: DataHub): Translator.Translator {
	return new DiscourseTranslator(data, hub);
}
