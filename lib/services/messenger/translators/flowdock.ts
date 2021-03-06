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
import { Session } from 'flowdock';
import { AllHtmlEntities } from 'html-entities';
import * as _ from 'lodash';
import { Dictionary } from 'lodash';
import * as marked from 'marked';
import {
	FlowdockConstructor,
	FlowdockEmitInstructions,
	FlowdockEvent,
	FlowdockMessage,
	FlowdockResponse,
} from '../../flowdock-types';
import {
	BasicEventInformation,
	CreateThreadResponse,
	MessageDetails,
	MessengerAction,
	MessengerConstructor,
	MessengerEvent,
	ReceiptIds,
	ReceiptInformation,
	SourceDescription,
	TransmitInformation,
	UpdateThreadResponse,
} from '../../messenger-types';
import { ServiceType } from '../../service-types';
import { Translator, TranslatorError } from './translator';
import { MetadataEncoding, TranslatorScaffold } from './translator-scaffold';
import {
	EmitConverters,
	MetadataConfiguration,
	ResponseConverters,
	TranslatorErrorCode,
	TranslatorMetadata,
} from './translator-types';
const htmlEntities = new AllHtmlEntities();

export interface FlowdockMetadata extends TranslatorMetadata {
	/** Title of the message, usually this doesn't get extracted from the message body; but flowdock. */
	title?: string;
}

/**
 * Class to enable the translating between messenger standard forms and service
 * specific forms.
 */
export class FlowdockTranslator extends TranslatorScaffold implements Translator {
	/**
	 * Given a basic string this will extract a more rich context for the event, if embedded.
	 * @param message  Basic string that may contain metadata.
	 * @param format   Format of the metadata encoding.
	 * @param config   Configuration that may have used to encode metadata.
	 * @returns        Object of content, genesis and hidden.
	 */
	public static extractMetadata(
		message: string, format: MetadataEncoding, config: MetadataConfiguration,
	): FlowdockMetadata {
		// One line of characters `(.*)`...
		// then markdown title formatting on the very next line `\r?\n[-=]+`...
		// then any amount of whitespace that includes a new line `\s*\n\s*`...
		// then absolutely any content `([\s\S]+)`
		const titleSplitter = /^(.*)\r?\n[-=]+\s*\n\s*([\s\S]+)$/;
		const titleAndText = message.match(titleSplitter);
		const superMessage = titleAndText ? titleAndText[2].trim() : message.trim();
		const superFormat = (format === MetadataEncoding.Flowdock) ? MetadataEncoding.HiddenMD : format;
		const metadata = TranslatorScaffold.extractMetadata(superMessage, superFormat, config) as FlowdockMetadata;
		const findPublic = '^% *';
		metadata.title = titleAndText ? marked(titleAndText[1]).replace(/<[^>]*>/g, ' ').trim() : undefined;
		if ((format === MetadataEncoding.Flowdock) && (metadata.service === null)) {
			// Check for magic syntax if the message originated in Flowdock
			metadata.hidden = !(new RegExp(findPublic, 'i').test(message));
		}
		if (metadata.hidden === false) {
			// Tidy any magic syntax from public messages
			metadata.content = metadata.content.replace(new RegExp(findPublic, 'igm'), '').trim();
			if (metadata.title) {
				metadata.title = metadata.title.replace(new RegExp(findPublic, 'igm'), '').trim();
				metadata.title = htmlEntities.decode(metadata.title);
			}
		}
		return metadata;
	}

	/**
	 * Encode the metadata of an event into a string to embed in the message.
	 * @param message  Message to encode details of.
	 * @param current  Service which found the message.
	 * @param format   Optional, markdown or plaintext, defaults to markdown.
	 * @param config   Configuration that should be used to encode the metadata.
	 * @returns        Text with data embedded.
	 */
	public static stringifyMetadata(
		message: MessageDetails, current: ReceiptIds, format: MetadataEncoding, config: MetadataConfiguration,
	): string {
		const superFormat = (format === MetadataEncoding.Flowdock) ? MetadataEncoding.HiddenMD : format;
		return TranslatorScaffold.stringifyMetadata(message, current, superFormat, config);
	}

	/**
	 * Extract the thread id for the referenced service from an array of messages.
	 * @param service   Service of interest.
	 * @param messages  Message to search.
	 * @param config      Configuration that may have been used to encode metadata.
	 * @param format    Format used to encode the metadata.
	 */
	public static extractSource(
		source: ReceiptIds,
		messages: string[],
		config: MetadataConfiguration,
		format?: MetadataEncoding,
	): SourceDescription {
		const superFormat = (format === MetadataEncoding.Flowdock) ? MetadataEncoding.HiddenMD : format;
		return TranslatorScaffold.extractSource(source, messages, config, superFormat);
	}

	/**
	 * Convert an array of tags into a single hash-tagged string.
	 * @param tags  Array of strings to hashtag and join.
	 * @returns     String of joined hashtags.
	 */
	public static makeTagString(tags: string[]): string {
		const hashAddedTags = _.map(tags, (tag) => {
			return `#${tag}`;
		});
		return hashAddedTags.join(' ');
	}

	/**
	 * Internal function to create a formatted and length limited text block for a message.
	 * @param body     Body of the message, this part may end up snipped.
	 * @param options  Other parts of the message and guides as to formatting.
	 *                   may contain header, metadata, footer, tags and linePrefix.
	 * @returns         Markdown formatted text block within Flowdock's character limit.
	 */
	public static createFormattedText(
		body: string,
		options: {
			header?: string;
			metadata?: string;
			footer?: string;
			tags?: string[];
			prefix?: string;
			lengthLimit?: number;
			url?: string;
		} = {},
		config: MetadataConfiguration,
	): string {
		const lengthLimit = (options && options.lengthLimit) || 8096;
		const prefix = options.prefix || '';
		let first = '';
		if (options.header) {
			if (options.url) {
				first = `[${options.header}](${options.url})\n--\n`;
			} else {
				first = `${options.header}\n--\n`;
			}
		}
		const second = options.tags ? `${FlowdockTranslator.makeTagString(options.tags)}\n` : '';
		const penultimate = options.footer ? `\n${options.footer}` : '';
		const lastProvisional = options.metadata ? `\n${options.metadata}` : '';
		const candidate = `${prefix}${first}${second}${body}${penultimate}${lastProvisional}`;
		if (candidate.length < lengthLimit) {
			return candidate;
		}
		const snipProvisional = '\n`… about xx% shown.`';
		const midSpace = lengthLimit - `${prefix}${first}${second}${snipProvisional}${penultimate}${lastProvisional}`.length;
		const snipped = body.substr(0, midSpace);
		const roundedSnip = Math.floor((100*snipped.length)/body.length);
		const snipText = snipProvisional.replace('xx', roundedSnip.toString(10));
		const newSign = TranslatorScaffold.signText(`${snipped}${snipText}`, config.secret);
		if (options.metadata) {
			options.metadata = options.metadata.replace(/hmac=[0-9a-f]+/, `hmac=${newSign}`);
		}
		const last = options.metadata ? `\n${options.metadata}` : '';
		return `${prefix}${first}${second}${snipped}${snipText}${penultimate}${last}`;
	}

	/**
	 * Utility function to structure the flowdock session as a promise.
	 * @param session  Session to interrogate
	 * @param path     Endpoint to retrieve.
	 * @param search   Optional, some words which may be used to shortlist the results.
	 * @returns        Response from the session.
	 */
	protected static fetchFromSession = (session: Session, path: string, search?: string): Promise<any> => {
		return new Promise<any>((resolve, reject) => {
			session.get(path, {search}, (error?: Error, result?: any) => {
				if (result) {
					resolve(result);
				} else {
					reject(error);
				}
			});
		});
	}

	/**
	 * Converts a response into the generic format.
	 * @param message   The initial message that prompted this action.
	 * @param response  The response from the SDK.
	 * @returns         Promise that resolve to the thread details.
	 */
	private static convertCreateThreadResponse(
		message: TransmitInformation, response: FlowdockResponse
	): Promise<CreateThreadResponse> {
		const thread = response.thread_id;
		const url = `https://www.flowdock.com/app/${message.target.flow}/threads/${thread}`;
		return Promise.resolve({
			thread: response.thread_id,
			url,
		});
	}

	/**
	 * Converts a response into the generic format.
	 * @param metadataConfig  Configuration of how metadata was encoded
	 * @param event           The initial message that prompted this action.
	 * @param response        The response from the SDK.
	 * @returns               Promise that resolve to the thread details.
	 */
	private static convertReadConnectionResponse(
		metadataConfig: MetadataConfiguration, event: BasicEventInformation, response: FlowdockMessage[]
	): Promise<SourceDescription> {
		// Create an array of those tag IDs that match on service & flow
		const idsFromTags = _.compact(_.map(response[0].tags, (tag) => {
			const mirrorMatch = /^mirror:/;
			if (mirrorMatch.test(tag)) {
				const ids = TranslatorScaffold.slugToIds(tag.replace(mirrorMatch, ''));
				if (
					(ids.service === event.current.service) &&
					(ids.flow === event.current.flow)
				) {
					return ids;
				}
			}
		}));
		if (idsFromTags.length > 0) {
			return Promise.resolve(idsFromTags[0]);
		}
		return Promise.resolve(FlowdockTranslator.extractSource(
			event.current,
			_.map(response, (comment) => { return comment.content; }),
			metadataConfig,
			MetadataEncoding.Flowdock,
		));
	}

	/**
	 * Converts a response into the generic format.
	 * @param _message   The initial message that prompted this action.
	 * @param _response  The response from the SDK.
	 * @returns          Promise that resolve to the thread details.
	 */
	private static convertUpdateThreadResponse(
		_message: TransmitInformation, _response: FlowdockResponse
	): Promise<UpdateThreadResponse> {
		return Promise.resolve({});
	}

	/**
	 * Converts a provided message object into instructions to create a thread.
	 * @param metadataConfig  Configuration of how to encode metadata
	 * @param message         object to analyse.
	 * @returns               Promise that resolves to emit instructions.
	 */
	private static createThreadIntoEmit(
		metadataConfig: MetadataConfiguration,
		event: TransmitInformation
	): Promise<FlowdockEmitInstructions> {
		if (!event.details.message) {
			return Promise.reject('Cannot email a thread without a message.');
		}
		// Bundle for the session
		return Promise.resolve({
			method: ['post'],
			payload: {
				path: `/flows/${event.target.flow}/messages`,
				payload: {
					// The concatenated string, of various data nuggets, to emit.
					content: FlowdockTranslator.createFormattedText(
						event.details.message.text,
						{
							header: event.details.thread.title,
							metadata: FlowdockTranslator.stringifyMetadata(
								event.details.message,
								event.current,
								MetadataEncoding.Flowdock,
								metadataConfig
							),
							prefix: event.details.message.hidden ? '' : '% ',
							url: _.get(event, ['source', 'url']),
						},
						metadataConfig,
					),
					event: 'message',
					external_user_name: event.details.user.handle.replace(/\s/g, '_')
				}
			}
		});
	}

	/**
	 * Converts a provided message object into instructions to create a message.
	 * @param metadataConfig  Configuration of how to encode metadata.
	 * @param event           object to analyse.
	 * @returns               Promise that resolves to emit instructions.
	 */
	private static createMessageIntoEmit(
		metadataConfig: MetadataConfiguration,
		event: TransmitInformation
	): Promise<FlowdockEmitInstructions> {
		// Check we have a thread.
		const threadId = event.target.thread;
		if (!threadId) {
			return Promise.reject(new TranslatorError(
				TranslatorErrorCode.IncompleteTransmitInformation, 'Cannot create a comment without a thread.'
			));
		}
		if (!event.details.message) {
			return Promise.reject(new TranslatorError(
				TranslatorErrorCode.IncompleteTransmitInformation, 'Cannot emit an absent message.'
			));
		}
		// Bundle for the session.
		return Promise.resolve({
			method: ['post'],
			payload: {
				path: `/flows/${event.target.flow}/threads/${threadId}/messages`,
				payload: {
					content: FlowdockTranslator.createFormattedText(
						event.details.message.text,
						{
							metadata: FlowdockTranslator.stringifyMetadata(
								event.details.message,
								event.current,
								MetadataEncoding.Flowdock,
								metadataConfig
							),
							prefix: event.details.message.hidden ? '' : '% ',
						},
						metadataConfig,
					),
					event: 'message',
					external_user_name: event.details.user.handle.replace(/\s/g, '_'),
				}
			}
		});
	}

	/**
	 * Converts a provided message object into instructions to update tags.
	 * @param session  Session to query to find the initial message of the thread.
	 * @param message  object to analyse.
	 * @returns        Promise that resolves to emit instructions.
	 */
	private static updateTagsIntoEmit(
		session: Session, message: TransmitInformation
	): Promise<FlowdockEmitInstructions> {
		// Check we have a thread.
		const threadId = message.target.thread;
		if (!threadId) {
			return Promise.reject(new TranslatorError(
				TranslatorErrorCode.IncompleteTransmitInformation, 'Cannot update tags without a thread.'
			));
		}
		// Check we have tags.
		const tags = message.details.thread.tags;
		if (!_.isArray(tags)) {
			return Promise.reject(new TranslatorError(
				TranslatorErrorCode.IncompleteTransmitInformation, 'Cannot update tags without a tags array.'
			));
		}
		// Get the initial message.
		return FlowdockTranslator.fetchFromSession(session, `/flows/${message.target.flow}/threads/${threadId}`)
		.then((threadResponse) => {
			return FlowdockTranslator.fetchFromSession(
				session,
				`/flows/${message.target.flow}/messages/${threadResponse.initial_message}`,
			);
		})
		// Add the actual tags to the user mention tags
		.then((initialMessage) => {
			const systemTags = _.filter(initialMessage.tags, (tag: string) => {
				return /^:/.test(tag);
			});
			// Bundle for the session.
			return {
				method: ['put'],
				payload: {
					path: `/flows/${message.target.flow}/messages/${initialMessage.id}`,
					payload: {
						tags: _.concat(tags, systemTags)
					},
				}
			};
		});
	}

	/**
	 * Converts a provided message object into instructions to read a thread.
	 * @param message  object to analyse.
	 * @returns        Promise that resolves to emit instructions.
	 */
	private static readThreadIntoEmit(message: TransmitInformation, term?: string): Promise<FlowdockEmitInstructions> {
		// Check we have a thread.
		const threadId = message.target.thread;
		if (!threadId) {
			return Promise.reject(new TranslatorError(
				TranslatorErrorCode.IncompleteTransmitInformation, 'Cannot read a thread without a thread.'
			));
		}
		const subPayload: Dictionary<string> = {
			limit: '100', // Default is 30, but there is literally no reason why we wouldn't ask for as many as we can
		};
		if (term) {
			subPayload.search = term;
		}
		// Bundle for the session.
		return Promise.resolve({
			method: ['get'],
			payload: {
				path: `/flows/${message.target.flow}/threads/${threadId}/messages`,
				payload: subPayload,
			}
		});
	}

	private static searchThreadIntoEmit(message: TransmitInformation): Promise<FlowdockEmitInstructions> {
		return FlowdockTranslator.readThreadIntoEmit(message, message.current.service);
	}

	private static syncStateIntoEmit(session: Session, message: TransmitInformation): Promise<FlowdockEmitInstructions> {
		const threadId = message.target.thread;
		return FlowdockTranslator.fetchFromSession(session, `/flows/${message.target.flow}/threads/${threadId}`)
		.then((threadResponse) => {
			return FlowdockTranslator.fetchFromSession(
				session,
				`/flows/${message.target.flow}/messages/${threadResponse.initial_message}`,
			);
		})
		.then((initialMessage) => {
			_.forEach(message.details.thread.states, (toSet, state) => {
				if (toSet) {
					initialMessage.tags.push(`is-${state}`);
				} else {
					_.pull(initialMessage.tags, `is-${state}`);
				}
			});
			return {
				method: ['put'],
				payload: {
					path: `/flows/${message.target.flow}/messages/${initialMessage.id}`,
					payload: {
						tags: initialMessage.tags
					},
				}
			};
		});
	}

	/**
	 * Converts a response into the generic format.
	 * @param _message  The initial message that prompted this action.
	 * @param response  The response from the SDK.
	 * @returns               Promise that resolve to the thread details.
	 */
	private static convertReadErrorResponse(
		_message: TransmitInformation, response: FlowdockMessage[]
	): Promise<string[]> {
		return Promise.resolve(_.map(response, (comment) => comment.content));
	}

	private static convertReadThreadResponse(
		config: MetadataConfiguration,
		show: 'reply' | 'whisper' | 'all',
		_message: TransmitInformation,
		response: FlowdockMessage[],
	): Promise<TranslatorMetadata[]> {
		return Promise.resolve(_.compact(_.map(response, (comment) => {
			const messageObject = FlowdockTranslator.extractMetadata(comment.content, MetadataEncoding.Flowdock, config);
			if (show === 'all') {
				return messageObject;
			} else if ((show === 'reply') && (messageObject.hidden === false)) {
				return messageObject;
			} else if ((show === 'whisper') && (messageObject.hidden === true)) {
				return messageObject;
			}
		})));
	}

	protected eventEquivalencies = {
		message: ['message'],
	};
	protected emitConverters: EmitConverters = {
		[MessengerAction.ReadConnection]: FlowdockTranslator.readThreadIntoEmit,
		[MessengerAction.ReadErrors]: FlowdockTranslator.searchThreadIntoEmit,
		[MessengerAction.ListWhispers]: FlowdockTranslator.readThreadIntoEmit,
		[MessengerAction.ListReplies]: FlowdockTranslator.readThreadIntoEmit,
	};
	protected responseConverters: ResponseConverters = {
		[MessengerAction.UpdateTags]: FlowdockTranslator.convertUpdateThreadResponse,
		[MessengerAction.CreateMessage]: FlowdockTranslator.convertUpdateThreadResponse,
		[MessengerAction.SyncState]: FlowdockTranslator.convertUpdateThreadResponse,
		[MessengerAction.CreateConnection]: FlowdockTranslator.convertUpdateThreadResponse,
		[MessengerAction.CreateThread]: FlowdockTranslator.convertCreateThreadResponse,
		[MessengerAction.ReadErrors]: FlowdockTranslator.convertReadErrorResponse,
	};
	protected session: Session;

	private readonly token: string;

	constructor(data: FlowdockConstructor, metadataConfig: MetadataConfiguration) {
		super(metadataConfig);
		this.session = new Session(data.token);
		// The flowdock service both emits and calls back the error
		// We'll just log the emit to prevent it bubbling
		this.session.on('error', _.partial(console.log, 'Error in Flowdock translator.'));
		this.token = data.token;
		// These converters require the injection of a couple of details from `this` instance.
		this.responseConverters[MessengerAction.ReadConnection] =
			_.partial(FlowdockTranslator.convertReadConnectionResponse, metadataConfig);
		this.responseConverters[MessengerAction.ListWhispers] =
			_.partial(FlowdockTranslator.convertReadThreadResponse, metadataConfig, 'whisper');
		this.responseConverters[MessengerAction.ListReplies] =
			_.partial(FlowdockTranslator.convertReadThreadResponse, metadataConfig, 'reply');
		this.emitConverters[MessengerAction.CreateThread] =
			_.partial(FlowdockTranslator.createThreadIntoEmit, metadataConfig);
		this.emitConverters[MessengerAction.CreateMessage] =
			_.partial(FlowdockTranslator.createMessageIntoEmit, metadataConfig);
		this.emitConverters[MessengerAction.CreateConnection] =
			_.partial(FlowdockTranslator.createMessageIntoEmit, metadataConfig);
		this.emitConverters[MessengerAction.UpdateTags] =
			_.partial(FlowdockTranslator.updateTagsIntoEmit, this.session);
		this.emitConverters[MessengerAction.SyncState] =
			_.partial(FlowdockTranslator.syncStateIntoEmit, this.session);
	}

	/**
	 * Promise to convert a provided service specific event into messenger's standard form.
	 * @param event  Service specific event, straight out of the ServiceListener.
	 * @returns      Promise that resolves to an array of message objects in the standard form
	 */
	public eventIntoMessages(event: FlowdockEvent): Promise<MessengerEvent[]> {
		const details = this.eventIntoMessageDetails(event);
		// Start building this in service scaffold form.
		const cookedEvent: ReceiptInformation = {
			details: {
				user: {
					handle: 'duff_FlowdockTranslator_eventIntoMessage_a', // gets replaced
				},
				message: {
					hidden: details.message.metadata.hidden,
					text: details.message.text,
					time: details.message.time,
				},
				thread: {
					tags: [],
					title: 'duff_FlowdockTranslator_eventIntoMessage_b', // gets replaced
					messageCount: event.rawEvent.thread.internal_comments,
				}
			},
			current: {
				service: details.ids.service,
				message: event.rawEvent.id,
				flow: details.ids.flow,
				thread: details.ids.thread,
				url: details.paths.thread,
				username: 'duff_FlowdockTranslator_eventIntoMessage_c', // gets replaced
			},
			source: {
				service: details.message.metadata.service || details.ids.service,
				flow: details.message.metadata.flow || details.ids.flow,
				thread: details.message.metadata.thread || details.ids.thread,
				message: details.ids.message,
				url: details.paths.thread,
				username: 'duff_FlowdockTranslator_eventIntoMessage_a', // gets replaced
			}
		};
		// Get details of the tags and title from the first message.
		return FlowdockTranslator.fetchFromSession(this.session, details.paths.firstMessage)
		.then((firstMessage) => {
			const firstMessageEvent = _.merge(_.cloneDeep(event), { rawEvent: firstMessage });
			const firstMessageDetails = this.eventIntoMessageDetails(firstMessageEvent);
			cookedEvent.details.thread.title = firstMessageDetails.message.title;
			return Promise.resolve(undefined);
		})
		// Get details of the user nickname.
		.then(() => this.fetchAlias(event))
		// Resolve to the details, compiled from those provided and those gathered.
		.then((username: string) => {
			cookedEvent.source.username = username;
			cookedEvent.details.user.handle = username;
			cookedEvent.current.username = username;
			return [{
				context: `${event.source}.${event.context}`,
				type: this.eventIntoMessageType(event),
				cookedEvent,
				rawEvent: event.rawEvent,
				source: event.source,
			}];
		});
	}

	/**
	 * Promise to provide emitter construction details for a provided message.
	 * @param _message  Message information, not used.
	 * @returns         The details required to construct an emitter.
	 */
	public messageIntoEmitterConstructor(_message: TransmitInformation): FlowdockConstructor {
		return {
			serviceName: 'flowdock',
			token: this.token,
			type: ServiceType.Emitter
		};
	}

	/**
	 * Populate the listener constructor with details from the more generic constructor.
	 * Provided since the connectionDetails might need to be parsed from JSON and the server details might be instantiated.
	 * @param connectionDetails  Construction details for the service, probably 'inert', ie from JSON.
	 * @param genericDetails     Details from the construction of the messenger.
	 * @returns                  Connection details with the value merged in.
	 */
	public mergeGenericDetails(
		connectionDetails: FlowdockConstructor, genericDetails: MessengerConstructor
	): FlowdockConstructor {
		if (connectionDetails.type === undefined) {
			connectionDetails.type = genericDetails.type;
		}
		return connectionDetails;
	}

	/**
	 * Promise to retrieve the alias used to present an event
	 * @param event  Event to scrutinise for user details
	 * @returns      Promise that resolves to the alias presented with the message
	 */
	protected fetchAlias(event: FlowdockEvent): Promise<string> {
		if (event.rawEvent.external_user_name) {
			return event.rawEvent.external_user_name;
		}
		const url = `/users/${event.rawEvent.user}`;
		return FlowdockTranslator.fetchFromSession(this.session, url)
		.get('nick');
	}

	/**
	 * Calculate some trivially derivable details from an event and this context.
	 * @param event  Event to analyse.
	 * @returns      Some cherry picked derivations of the event.
	 */
	protected eventIntoMessageDetails(event: FlowdockEvent) {
		// Calculate metadata and use whichever matched, i.e. has a shorter content because it extracted metadata.
		const metadata = FlowdockTranslator.extractMetadata(
			event.rawEvent.content, MetadataEncoding.Flowdock, this.metadataConfig
		);
		// Pull some details out of the event.
		const flow = event.cookedEvent.flow;
		const threadId = event.rawEvent.thread_id;
		const user = event.rawEvent.user;
		const service = event.source;
		const message = event.rawEvent.id;
		const threadUrl = `https://www.flowdock.com/app/${flow}/threads/${threadId}`;
		const firstMessageId = event.rawEvent.thread.initial_message;
		const firstMessagePath = `flows/${flow}/messages/${firstMessageId}`;
		const messagesPath = `/flows/${flow}/threads/${threadId}/messages`;
		return {
			ids: {
				service,
				flow,
				thread: threadId,
				user,
				message,
				firstMessage: firstMessageId,
			},
			paths: {
				thread: threadUrl,
				firstMessage: firstMessagePath,
				messages: messagesPath,
			},
			message: {
				metadata,
				text: metadata.content,
				time: event.rawEvent.created_at,
				title: metadata.title,
			}
		};
	}
}

/**
 * Builds a translator that will convert Flowdock specific information to and from Messenger format.
 * @param data            Construction details for creating a Flowdock session.
 * @param metadataConfig  Configuration of how to encode metadata.
 * @returns               A translator, ready to interpret Flowdock's communications.
 */
export function createTranslator(data: FlowdockConstructor, metadataConfig: MetadataConfiguration): Translator {
	return new FlowdockTranslator(data, metadataConfig);
}
