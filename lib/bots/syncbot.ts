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
import * as crypto from 'crypto';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as os from 'os';
import * as util from 'util';
import { ProcBot } from '../framework/procbot';
import {
	ProcBotEnvironmentProperties,
	ProcBotEnvironmentQuery,
	ProcessProperty,
	SystemProperty,
} from '../framework/procbot-types';
import { MessengerService } from '../services/messenger';
import {
	BasicEventInformation,
	CreateThreadResponse,
	FlowDefinition,
	FlowMapping,
	MessageListener,
	MessengerAction,
	MessengerConnectionDetails,
	MessengerEmitResponse,
	MessengerEvent,
	ReceiptInformation,
	SolutionIdea,
	SolutionIdeas,
	SolutionMatrix,
	ThreadDefinition,
	TransmitInformation,
} from '../services/messenger-types';
import { TranslatorError } from '../services/messenger/translators/translator';
import { TranslatorScaffold } from '../services/messenger/translators/translator-scaffold';
import {
	MetadataConfiguration,
	TranslatorErrorCode,
} from '../services/messenger/translators/translator-types';
import {
	ServiceRegistration,
	ServiceType,
} from '../services/service-types';
import { Logger, LogLevel } from '../utils/logger';

export interface SyncBotConstructor {
	SYNCBOT_ALIAS_USERS: string[];
	SYNCBOT_ERROR_SOLUTIONS: SolutionMatrix;
	SYNCBOT_ERROR_UNDOCUMENTED: string;
	SYNCBOT_MAPPINGS: FlowMapping[];
	SYNCBOT_METADATA_CONFIG: MetadataConfiguration;
	SYNCBOT_PORT: string;
	SYNCBOT_NAME: string;
	SYNCBOT_SERVICE_CONSTRUCTORS: MessengerConnectionDetails;
	SYNCBOT_ARCHIVE_STRINGS: string[];
	SYNCBOT_DEVOPS_FLOW: string;
	SYNCBOT_DEVOPS_USERS: string[];
}

/**
 * A bot that mirrors threads across services.
 */
export class SyncBot extends ProcBot {
	/**
	 * Find, from the environment, a possible solution to the provided error message.
	 * @param service         Name of the service reporting the error.
	 * @param message         Message that the service reported.
	 * @param solutionMatrix  Possible solutions
	 * @returns               A suggested fix to the error.
	 */
	public static getErrorSolution(service: string, message: string, solutionMatrix: SolutionMatrix): SolutionIdea {
		try {
			const solutionIdeas: SolutionIdeas = _.get(solutionMatrix, service, {});
			const filteredSolutions = _.filter(solutionIdeas, (_value: any, pattern: string) => {
				return new RegExp(pattern).test(message);
			});
			if (filteredSolutions.length > 0) {
				return filteredSolutions[0];
			} else {
				return {
					description: message,
					fixes: [],
				};
			}
		} catch (error) {
			throw new Error('SYNCBOT_ERROR_SOLUTIONS not a valid JSON object of service => { message => resolution }.');
		}
	}

	/**
	 * Digest a message string into a query that can go to the ProcBot library.
	 * @param message  Message to be broken apart.
	 * @returns        Object of properties to form an environment query.
	 */
	public static messageIntoEnvQuery(
		message: string
	): { filter: ProcBotEnvironmentProperties, query: ProcBotEnvironmentQuery } {
		const filter: ProcBotEnvironmentProperties = {
			package: [],
			process: [],
			system: []
		};
		const query: ProcBotEnvironmentQuery = {
			package: [],
			process: [],
			system: []
		};
		// This bundles the whitespace separated parts of the message into details to pass to the ProcBot library
		const messageParts = message.split(/\s+/g);
		_.forEach(messageParts, (messagePart) => {
			if (!/^@/.test(messagePart)) {
				// Split the part down around '=' and '.'.
				const filterHalves = messagePart.split(/=/g);
				const propertyPath = filterHalves[0].split(/\./g);
				const scope = propertyPath.length === 2 ? propertyPath[0] : 'process';
				const property = propertyPath.length === 2 ? propertyPath[1] : propertyPath[0];
				const value = filterHalves.length === 2 ? filterHalves[1] : undefined;
				// Put each part into either query or filter, based on the existence of '='
				if (value) {
					if (scope === 'process') {
						filter.process.push({
							property: property as keyof NodeJS.Process,
							value,
						});
					} else if (scope === 'system') {
						filter.system.push({
							property: property as keyof typeof os,
							value,
						});
					} else if (scope === 'package') {
						filter.package.push({
							property,
							value,
						});
					}
				} else {
					if (scope === 'process') {
						query.process.push(property as keyof NodeJS.Process);
					} else if (scope === 'system') {
						query.system.push(property as keyof typeof os);
					} else if (scope === 'package') {
						query.package.push(property);
					}
				}
			}
		});
		return { filter, query };
	}

	/**
	 * Convert the results from an environment query into a outputabble string.
	 * @param result  Object direct from the ProcBot library.
	 * @returns       String suitable for output.
	 */
	public static envResultIntoMessage(result: ProcBotEnvironmentProperties): string {
		const shortResponses: string[] = [];
		const longResponses: string[] = [];
		_.forEach(result, (list, scope) => {
			_.forEach(list, (item: SystemProperty | ProcessProperty) => {
				if (_.isArray(item.value) || _.isObject(item.value)) {
					let value = util.inspect(
						item.value,
						{
							depth: null,
							maxArrayLength: null,
						},
					);

					// util.inspect() changes between node versions cause an inconsistency with regards to whitespace
					value = value.split('\n').map((line) => { return line.replace(/\s*$/,''); }).join('\n');
					longResponses.push(`${scope}.${item.property}=\n\`\`\`json\n${value}\n\`\`\``);
				} else if (_.isNull(item.value) || _.isUndefined(item.value)) {
					shortResponses.push(`${scope}.${item.property}?!`);
				} else {
					shortResponses.push(`${scope}.${item.property}=${item.value.toString()}`);
				}
			});
		});
		return `${shortResponses.join('\n')}\n${longResponses.join('\n')}`.trim();
	}

	/**
	 * Provide a method that:
	 *  * Encloses details available in advance.
	 *  * Reacts to details provided by each event.
	 * @param from                 Definition, {service, flow}, of the flow being listened to.
	 * @param to                   Definition {service, flow} of the flow being emitted to.
	 * @param emitter              Service to use to interact with the cloud.
	 * @param logger               Logger to use to interact with the maintainers.
	 * @param actions              An array of which actions to sync along this route.
	 * @param name                 Username that the router should use.
	 * @param aliases              List of usernames that the router should alias.
	 * @param solutionMatrix       A matrix of possible solutions to common routing errors.
	 * @param genericErrorMessage  An error message that should be used by default.
	 * @param archiveStrings       An array of strings that instruct the router to archive.
	 * @returns                    Function that processes events from the listener.
	 */
	private static makeRouter(
		from: FlowDefinition,
		to: FlowDefinition,
		emitter: MessengerService,
		logger: Logger,
		actions: MessengerAction[],
		name: string,
		aliases: string[] = [],
		solutionMatrix?: SolutionMatrix,
		genericErrorMessage?: string,
		archiveStrings?: string[],
	): MessageListener {
		// This method returns a method that in turn processes events.
		return (_registration, event: MessengerEvent) => {
			const data = event.cookedEvent;
			// Check that the event is one we want to synchronise.
			const sourceText = `${data.source.service} (${data.source.flow})`;
			const fromText = `${from.service} (${from.flow})`;
			const toText = `${to.service} (${to.flow})`;
			const firstLine = data.details.message ? data.details.message.text.split(/[\r\n]/)[0] : data.details.thread.title;
			logger.log(
				LogLevel.DEBUG,
				`---> Considering '${firstLine}' on ${sourceText}, from ${fromText} to ${toText}. ${JSON.stringify(data)}`,
			);
			const compare = (a: any, b: any) => ((a.service === b.service) && (a.flow === b.flow));
			const eventIsOn = data.current;
			const eventCameFrom = data.source;
			if (
				compare(eventIsOn, from) &&
				!compare(eventCameFrom, to) &&
				!compare(eventIsOn, to) &&
				// https://github.com/resin-io-modules/resin-procbots/issues/301
				!data.current.intercomHack
			) {
				// Log that we received this event.
				logger.log(LogLevel.DEBUG, `---> Actioning '${firstLine}' to ${toText}.`);
				try {
					// This allows syncbot to represent specific other accounts.
					if (_.includes(_.map(aliases, _.toLower), data.details.user.handle.toLowerCase())) {
						data.details.user.handle = name;
						data.current.username = name;
						data.source.username = name;
					}
				} catch (error) {
					logger.log(LogLevel.WARN, 'Misconfiguration in SyncBot aliases.');
				}
				// Find details of any connections stored in the originating thread.
				return SyncBot.readConnectedThread(to, emitter, data, name)
				// Then comment on or create a thread, if appropriate.
				.then((threadDetails: MessengerEmitResponse) => {
					// Cease processing if there's an error and it is not ValueNotFound TranslatorError
					// Failure to find a thread is fine, this triggers creating a thread
					if (threadDetails.err && !(
						(threadDetails.err instanceof TranslatorError) &&
						(threadDetails.err.code === TranslatorErrorCode.ValueNotFound)
					)) {
						return threadDetails;
					}
					// If the search resolved with a response.
					const threadId = _.get(threadDetails, ['response', 'thread'], false);
					const flowId = _.get(threadDetails, ['response', 'flow'], true);
					if (
						(flowId === true || flowId === to.flow || _.includes(to.previous, flowId)) &&
						threadId && _.includes(actions, MessengerAction.CreateMessage) && data.details.message
					) {
						logger.logInfo(`---> Creating comment '${firstLine}' on ${toText}.`);
						logger.logDebug(`---> Full message from above, '${data.details.message.text}'.`);
						// Comment on the found thread
						const flow = { service: to.service, flow: to.flow, thread: threadId };
						return SyncBot.processCommand(flow, emitter, data, MessengerAction.CreateMessage)
						// Pass through details of the thread updated
						.then((emitResponse) => {
							if (emitResponse.err) {
								return emitResponse;
							}
							return {
								response: threadDetails.response,
								source: emitResponse.source,
							};
						});
					}
					if (!threadId && _.includes(actions, MessengerAction.CreateThread)) {
						logger.logInfo(`---> Creating thread '${data.details.thread.title}' on ${toText}.`);
						if (data.details.message) {
							logger.logDebug(`---> Full message from above, '${data.details.message.text}'.`);
						}
						// Create a thread if the quest for connections didn't find any
						return SyncBot.createThreadAndConnect(to, from, emitter, data, name);
					}
					return {
						response: threadDetails.response || {},
						source: to.service,
					};
				})
				.then((threadDetails: MessengerEmitResponse) => {
					if (threadDetails.err) {
						return threadDetails;
					}
					const threadId = _.get(threadDetails, ['response', 'thread'], false);
					const flowId = _.get(threadDetails, ['response', 'flow'], true);
					if (
						(flowId === true || flowId === to.flow || _.includes(to.previous, flowId)) &&
						threadId &&
						_.includes(actions, MessengerAction.SyncState) &&
						!_.isEmpty(data.details.thread.states)
					) {
						logger.logInfo(`---> Syncing state of '${firstLine}' to ${toText}.`);
						logger.logDebug(`---> Full states from above, '${JSON.stringify(data.details.thread.states)}'.`);
						const flow = { service: to.service, flow: to.flow, thread: threadId };
						return SyncBot.processCommand(flow, emitter, data, MessengerAction.SyncState)
						// Pass through details of the thread updated
						.then((emitResponse) => {
							if (emitResponse.err) {
								return emitResponse;
							}
							return threadDetails;
						})
						.catch((error) => {
							// If the service does not support the action then do not panic
							if (
								(error instanceof TranslatorError) &&
								(error.code === TranslatorErrorCode.EmitUnsupported)
							) {
								return threadDetails;
							}
						});
					}
					return threadDetails;
				})
				// Then report that we have passed the message on
				.then((threadDetails: MessengerEmitResponse) => {
					if (threadDetails.err) {
						return threadDetails;
					}
					logger.log(LogLevel.DEBUG, `---> Emitted '${firstLine}' to ${toText}.`);
					return threadDetails;
				})
				// Then archive the thread, if relevant
				.then((threadDetails: MessengerEmitResponse) => {
					if (threadDetails.err) {
						return threadDetails;
					}
					// Pull some details to calculate whether we should archive
					const threadId = _.get(threadDetails, ['response', 'thread'], false);
					const flowId = _.get(threadDetails, ['response', 'flow'], true);
					const routeArchive = _.includes(actions, MessengerAction.ArchiveThread);
					const archiveRegex = archiveStrings ? new RegExp(`(${archiveStrings.join('|')})`, 'i') : null;
					const toldToArchive = archiveRegex && data.details.message && archiveRegex.test(data.details.message.text);
					const inHiddenMessage = data.details.message && data.details.message.hidden;
					if (threadId && (flowId === true || flowId === to.flow) && inHiddenMessage && toldToArchive && routeArchive) {
						// Pass the instruction to archive to the static method
						const toFlow = { service: to.service, flow: to.flow, thread: threadId };
						const fromFlow = data.source;
						const reportArchive = (service: string, emitResponse: MessengerEmitResponse) => {
							const error = emitResponse.err;
							if (!error) {
								// If the service performed the action fine then report this
								logger.log(LogLevel.INFO, `---> Archived thread on ${service} based on comment '${firstLine}'.`);
								return threadDetails;
							} else if (error instanceof TranslatorError && error.code === TranslatorErrorCode.EmitUnsupported) {
								// If the service does not support the action then do not panic
								return threadDetails;
							} else {
								return emitResponse;
							}
						};
						return SyncBot.processCommand(toFlow, emitter, data, MessengerAction.ArchiveThread)
						.then(_.partial(reportArchive, toFlow.service))
						.then(() => {
							return SyncBot.processCommand(fromFlow, emitter, data, MessengerAction.ArchiveThread);
						})
						.then(_.partial(reportArchive, fromFlow.service));
					}
					// The correct action was to do nothing, so pass the details along to the next thing
					return threadDetails;
				})
				// At the end report any errors. ProcBot only expects promise resolution, no actual payload.
				// This also bookends the promise chain so each .then() above can be developed atomically.
				.then((threadDetails: MessengerEmitResponse) => {
					if (threadDetails.err !== undefined && !_.isEmpty(threadDetails.err)) {
						const errMsg: string = threadDetails.err.message || JSON.stringify(threadDetails.err);
						logger.log(LogLevel.WARN, JSON.stringify({
							// Details of the message and the response
							data, threadDetails,
							// These are a couple of properties that do not always survive the stringify
							message: errMsg,
							stack: threadDetails.err.stack || '',
						}));
						return SyncBot.createErrorComment(
							to, emitter, data, errMsg, name, solutionMatrix, genericErrorMessage
						)
						.return();
					}
				});
			}
			// The event received doesn't match the profile being routed, so nothing is the correct action.
			return Promise.resolve();
		};
	}

	/**
	 * Promise to post to the thread details of the error, and any likely fixes.
	 * @param to         The location we attempted to synchronise the data to.
	 * @param messenger  Service to use to communicate this message.
	 * @param data       The payload we attempted to synchronise.
	 * @param error      The error from the service.
	 * @param name       Handle to use for error reporting.
	 * @param matrix     A matrix of possible solutions
	 * @param generic    Optional, a generic error message.
	 * @returns          Promise that resolves to the response from creating the message.
	 */
	private static createErrorComment(
		to: FlowDefinition | ThreadDefinition,
		messenger: MessengerService,
		data: ReceiptInformation,
		error: string,
		name: string,
		matrix: SolutionMatrix = {},
		generic?: string,
	): Promise<MessengerEmitResponse> {
		const solution = SyncBot.getErrorSolution(to.service, error, matrix);
		const fixes = solution.fixes.length > 0 ?
			` * ${solution.fixes.join('\r\n * ')}` :
			generic || 'No fixes documented.';
		const errorMessage = `${to.service} reports \`${solution.description}\`.\r\n${fixes}\r\n`;
		// We 'received' this error from the place we were syncing to.
		const echoData: ReceiptInformation = {
			details: {
				user: {
					handle: name,
				},
				message: {
					hidden: 'preferred',
					text: errorMessage,
					time: moment().toISOString(),
				},
				thread: data.details.thread,
			},
			source: {
				message: 'duff_SyncBot_createErrorComment_a',
				thread: _.get(to, 'thread', 'duff_SyncBot_createErrorComment_b'),
				service: to.service,
				username: name,
				flow: to.flow,
			},
			current: {
				message: 'duff_SyncBot_createErrorComment_a',
				thread: _.get(to, 'thread', 'duff_SyncBot_createErrorComment_b'),
				service: to.service,
				username: name,
				flow: to.flow,
			},
		};
		// We should tell the place the message was found on
		return SyncBot.processCommand(data.current, messenger, echoData, MessengerAction.ReadErrors)
		.then((response) => {
			const needle = TranslatorScaffold.extractWords(errorMessage).join(' ');
			const isMentioned = _.some(response.response, (text) => {
				return TranslatorScaffold.extractWords(text).join(' ') === needle;
			});
			if (isMentioned) {
				return Promise.resolve({ response: 'Message recently outputted.', source: 'syncbot' });
			} else {
				return SyncBot.processCommand(data.source, messenger, echoData, MessengerAction.CreateMessage);
			}
		});
	}

	/**
	 * Pass to the messenger a request to perform a simple command.
	 * @param  to         Definition {service, flow, thread} of the thread being emitted to.
	 * @param  messenger  Service to use to interact with the cloud.
	 * @param  data       Event that is being processed.
	 * @param action      Action to perform.
	 * @returns           Promise to create the comment and respond with the threadId updated.
	 */
	private static processCommand(
		to: ThreadDefinition, messenger: MessengerService, data: BasicEventInformation, action: MessengerAction
	): Promise<MessengerEmitResponse> {
		const transmit: TransmitInformation = {
			action,
			details: data.details,
			current: data.current,
			target: {
				flow: to.flow,
				service: to.service,
				thread: to.thread,
				username: data.current.username,
			},
		};
		// Request that the payload created above be sent.
		return messenger.sendData({
			contexts: {
				messenger: transmit,
			},
			source: 'syncbot',
		});
	}

	/**
	 * Pass to the messenger a request to find a connected thread.
	 * @param  to         Definition {service, flow, thread} of the thread being emitted to.
	 * @param  messenger  Service to use to interact with the cloud.
	 * @param  data       Event that is being processed.
	 * @param username    Username under which to request the data.
	 * @returns           Promise to create the comment and respond with the threadId updated.
	 */
	private static readConnectedThread(
		to: FlowDefinition, messenger: MessengerService, data: BasicEventInformation, username: string,
	): Promise<MessengerEmitResponse> {
		// Bundle a read connection request, it's a bit weird compared to others in this file.
		// I've typed this here to split the union type earlier, and make error reports more useful.
		const readConnection: TransmitInformation = {
			action: MessengerAction.ReadConnection,
			details: data.details,
			// If credential details are required then consult with the SyncBot user.
			// `service` and `flow` are used to deduce the scope of connection sought...
			// the rest is irrelevant
			current: {
				flow: to.flow,
				message: 'duff_SyncBot_readConnectedThread_a',
				// The service you wish to find a connection for.
				service: to.service,
				thread: 'duff_SyncBot_readConnectedThread_b',
				username,
			},
			// This feels paradoxical because the target of the read request ...
			// is the place the event came from.
			target: {
				flow: data.current.flow,
				service: data.current.service,
				thread: data.current.thread,
				username,
			},
		};
		// Request that the payload created above be sent, which will resolve to the threadId connected.
		return messenger.sendData({
			contexts: {
				messenger: readConnection,
			},
			source: 'syncbot',
		});
	}

	/**
	 * Pass to the messenger requests to create a thread and connect.
	 * @param  to         Definition {service, flow} of the flow being emitted to.
	 * @param from        Definition {service, flow} of the flow being emitted from.
	 * @param  messenger  Service to use to interact with the cloud.
	 * @param  data       Event that is being processed.
	 * @param name        Username under which to create the connection message.
	 * @returns           Promise to create the thread and respond with the threadId.
	 */
	private static createThreadAndConnect(
		to: FlowDefinition, from: FlowDefinition, messenger: MessengerService, data: ReceiptInformation, name: string,
	): Promise<MessengerEmitResponse> {
		// Bundle a thread creation request.
		// I've typed this here to split the union type earlier, and make error reports more useful.
		const createThread: TransmitInformation = {
			action: MessengerAction.CreateThread,
			details: data.details,
			current: data.current,
			source: data.source,
			target: {
				flow: to.flow,
				service: to.service,
				username: data.current.username,
			},
		};
		// Request that the payload created above be sent.
		return messenger.sendData({
			contexts: {
				messenger: createThread,
			},
			source: 'syncbot',
		}).then((emitResponse: MessengerEmitResponse) => {
			// Insist that the response from creating a thread is a CreateThreadResponse for typing.
			const response = emitResponse.response as CreateThreadResponse;
			// Check that we actually got a correct resolution, not a promise that resolved with an error.
			// I've typed this here to split the union type earlier, and make error reports more useful.
			if (response) {
				// Bundle a payload that can be easily mutated to each of the source and target threads.
				const genericConnect: TransmitInformation = {
					action: MessengerAction.CreateConnection,
					// A message that advertises the connected thread.
					details: {
						user: {
							handle: name,
						},
						thread: {
							tags: data.details.thread.tags,
							title: data.details.thread.title,
						}
					},
					// this message is being created from nothing.
					current: {
						message: 'duff_SyncBot_createThreadAndConnect_b',
						thread: 'duff_SyncBot_createThreadAndConnect_c', // will be replaced
						flow: 'duff_SyncBot_createThreadAndConnect_d', // will be replaced
						service: 'duff_SyncBot_createThreadAndConnect_e', // will be replaced
						username: 'duff_SyncBot_createThreadAndConnect_f',
					},
					target: {
						flow: 'duff_SyncBot_createThreadAndConnect_g', // will be replaced
						service: 'duff_SyncBot_createThreadAndConnect_h', // will be replaced
						// This is happening using SyncBot's credentials.
						username: name,
						thread: 'duff_SyncBot_createThreadAndConnect_i' // will be replaced
					}
				};

				// Clone and mutate the generic payload for emitting to the originating thread.
				const updateOriginating = _.cloneDeep(genericConnect);
				// This should update the thread that this process sourced from.
				updateOriginating.target = {
					flow: data.current.flow,
					service: data.current.service,
					username: name,
					thread: data.current.thread,
				};
				// This comments on the original thread about the new thread.
				const targetText = `${createThread.target.service} ${to.alias || to.flow} thread ${response.thread}`;
				updateOriginating.details.message = {
					hidden: 'preferred',
					text: `This is mirrored in [${targetText}](${response.url})`,
					time: moment().toISOString()
				};
				updateOriginating.current.service = createThread.target.service;
				updateOriginating.current.thread = response.thread;
				updateOriginating.current.flow = createThread.target.flow;

				// Clone and mutate the generic payload for emitting to the created thread.
				const updateCreated = _.cloneDeep(genericConnect);
				// This should update the thread that this process created.
				updateCreated.target = {
					flow: createThread.target.flow,
					service: createThread.target.service,
					username: name,
					thread: response.thread,
				};
				// This comments on the new thread about the original thread..
				const sourceText = `${data.current.service} ${from.alias || from.flow} thread ${data.current.thread}`;
				updateCreated.details.message = {
					hidden: 'preferred',
					text: `This is mirrored in [${sourceText}](${data.current.url})`,
					time: moment().toISOString()
				};
				updateCreated.current.service = data.current.service;
				updateCreated.current.thread = data.current.thread;
				updateCreated.current.flow = data.current.flow;

				// Promise to post a message count if there is more than one message when the synced thread is created.
				let summariseThread: Promise<void> = Promise.resolve();
				if (data.details.thread.messageCount && (data.details.thread.messageCount > 1)) {
					const threadSummary = _.cloneDeep(updateCreated);
					const count = data.details.thread.messageCount - 1;
					const be = (count > 1) ? 'are' : 'is';
					const noun = (count > 1) ? 'messages' : 'message';
					threadSummary.details.message = {
						hidden: true,
						text: `There ${be} ${count} prior ${noun} on this thread`,
						time: moment().toISOString()
					};
					summariseThread = messenger.sendData({contexts: {messenger: threadSummary}, source: 'syncbot'}).return();
				}

				// Request that the payloads created just above be sent.
				return Promise.all([
					messenger.sendData({contexts: {messenger: updateOriginating}, source: 'syncbot'}),
					messenger.sendData({contexts: {messenger: updateCreated}, source: 'syncbot'}),
					summariseThread,
				]).return(emitResponse);
			}
			// If we failed to create a thread then just pass this back unmolested.
			return Promise.resolve(emitResponse);
		});
	}

	/**
	 * Consults the environment for configuration to create a service that aggregates many other services.
	 * @returns  Service that wraps and translates specified sub services.
	 */
	private static makeMessengers(
		serviceConstructors: MessengerConnectionDetails, port: number, metadataConfig: MetadataConfiguration, logger: Logger
	): { listener: MessengerService, emitter: MessengerService } {
		// Created this as its own function to scope the `let` a little
		const listener = new MessengerService({
			metadataConfig,
			ingress: port,
			serviceName: 'messenger',
			subServices: serviceConstructors,
			type: ServiceType.Listener,
		}, logger);

		const emitter = new MessengerService({
			metadataConfig,
			ingress: port,
			serviceName: 'messenger',
			subServices: serviceConstructors,
			type: ServiceType.Emitter,
		}, logger);

		if (listener && emitter) {
			return { listener, emitter };
		}
		throw new Error('Could not create Messenger.');
	}

	/**
	 * Create a function that will, under certain conditions, query the environment
	 * @param emitter    Service to use for emitting to the user.
	 * @param botname    Name that the message must begin with before activation.
	 * @param flow       Flow to check before activatation.
	 * @param users      List of account name hashes to check before activation.
	 * @returns          Method that will consume MessengerEvents.
	 */
	private static makeEnvironmentQuerier(
		emitter: MessengerService, botname: string, flow: string, users: string[]
	): MessageListener {
		return (_registration: ServiceRegistration, event: MessengerEvent): Promise<void> => {
			// This pre-check examines the event before letting it anywhere near the process.
			const beginsWithBotName = new RegExp(`^@${_.escapeRegExp(botname)}`, 'i');
			const hash = crypto.createHash('sha256').update(event.cookedEvent.source.username).digest('hex');
			if (
				// Not a synchronised post.
				(event.cookedEvent.current.service === event.cookedEvent.source.service) &&
				(event.cookedEvent.current.flow === event.cookedEvent.source.flow) &&
				// Contains a message
				event.cookedEvent.details.message &&
				// Addressed to syncbot.
				(beginsWithBotName.test(event.cookedEvent.details.message.text)) &&
				// On devops flow and from a devops user.
				(event.cookedEvent.source.flow === flow) &&
				(_.includes(users, hash))
			) {
				const environmentQuery = SyncBot.messageIntoEnvQuery(event.cookedEvent.details.message.text);
				return ProcBot.matchEnvironment(environmentQuery.filter)
				.then((matched) => {
					if (matched) {
						return ProcBot.queryEnvironment(environmentQuery.query)
						.then((environment) => {
							const text = SyncBot.envResultIntoMessage(environment);
							const echoData: BasicEventInformation = {
								details: {
									user: {
										handle: botname,
									},
									message: {
										hidden: true,
										text,
										time: moment().toISOString(),
									},
									thread: event.cookedEvent.details.thread
								},
								current: {
									service: 'process',
									flow: process.pid.toString(),
									thread: process.pid.toString(),
									message: process.uptime().toString(),
									username: botname,
								},
							};
							return SyncBot.processCommand(
								event.cookedEvent.source,
								emitter,
								echoData,
								MessengerAction.CreateMessage
							).return();
						});
					}
				});
			}
			return Promise.resolve();
		};
	}

	constructor(name = 'SyncBot') {
		super(name);

		ProcBot.retrieveConfiguration({
			emitter: 'string',
			location: process.env.SYNCBOT_CONFIG_TO_LOAD,
		}).then((rawConfig) => {
			if (rawConfig) {
				const config = ProcBot.injectEnvironmentVariables(rawConfig) as SyncBotConstructor;
				// Calculate secret to redact, with a couple that are specifically allowed through
				const secrets = ProcBot.determineInjections(rawConfig);
				delete secrets.SYNCBOT_PORT;
				delete secrets.SYNCBOT_NAME;
				this.logger.secrets = _.values(secrets);
				this.logger.log(LogLevel.INFO, `---> SyncBot configured to use port '${config.SYNCBOT_PORT}'.`);
				this.logger.log(LogLevel.INFO, `---> SyncBot configured to use name '${config.SYNCBOT_NAME}'.`);
				const port = parseInt(config.SYNCBOT_PORT, 10);
				const messengers = SyncBot.makeMessengers(
					config.SYNCBOT_SERVICE_CONSTRUCTORS, port, config.SYNCBOT_METADATA_CONFIG, this.logger
				);
				// Pass received messages through a method that might query the environment.
				messengers.listener.registerEvent({
					events: ['message'],
					listenerMethod: SyncBot.makeEnvironmentQuerier(
						messengers.emitter,
						config.SYNCBOT_NAME,
						config.SYNCBOT_DEVOPS_FLOW,
						config.SYNCBOT_DEVOPS_USERS,
					),
					name: 'queryEnvironment',
				});
				const mappings = config.SYNCBOT_MAPPINGS;
				const edgesMade = {};
				_.forEach(mappings, (mapping) => {
					const source = mapping.source;
					const destination = mapping.destination;
					// Register a mirroring from the first of the pair, to the second.
					const actions = [
						MessengerAction.CreateMessage,
						MessengerAction.CreateThread,
						MessengerAction.ArchiveThread,
						MessengerAction.SyncState
					];
					const router = SyncBot.makeRouter(
						source,
						destination,
						messengers.emitter,
						this.logger,
						actions,
						config.SYNCBOT_NAME,
						config.SYNCBOT_ALIAS_USERS,
						config.SYNCBOT_ERROR_SOLUTIONS,
						config.SYNCBOT_ERROR_UNDOCUMENTED,
						config.SYNCBOT_ARCHIVE_STRINGS
					);
					const label = `${source.service}.${source.flow}(all)=>${destination.service}.${destination.flow}`;
					messengers.listener.registerEvent({
						events: ['message'],
						listenerMethod: router,
						name: label,
					});
					const path = [source.service, source.flow, destination.service, destination.flow];
					_.set(edgesMade, path, true);
				});
				_.forEach(mappings, (mapping) => {
					// Create the reverse links for just messages
					const source = mapping.destination;
					const destination = mapping.source;
					const path = [source.service, source.flow, destination.service, destination.flow];
					if (!_.get(edgesMade, path, false)) {
						const router = SyncBot.makeRouter(
							source,
							destination,
							messengers.emitter,
							this.logger,
							[
								MessengerAction.CreateMessage,
								MessengerAction.ArchiveThread,
								MessengerAction.SyncState
							],
							config.SYNCBOT_NAME,
							config.SYNCBOT_ALIAS_USERS,
							config.SYNCBOT_ERROR_SOLUTIONS,
							config.SYNCBOT_ERROR_UNDOCUMENTED,
							config.SYNCBOT_ARCHIVE_STRINGS
						);
						const label = `${source.service}.${source.flow}(messages)=>${destination.service}.${destination.flow}`;
						messengers.listener.registerEvent({
							events: ['message'],
							listenerMethod: router,
							name: label,
						});
					}
				});
			} else {
				this.logger.log(LogLevel.WARN, "Couldn't load configuration.");
			}
		});
	}
}

export function createBot(): SyncBot {
	return new SyncBot();
}
