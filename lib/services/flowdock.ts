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
import * as _ from 'lodash';
import { Logger, LogLevel } from '../utils/logger';
import {
	FlowdockConstructor, FlowdockEmitContext,
	FlowdockHandle, FlowdockResponse
} from './flowdock-types';
import { ServiceScaffold } from './service-scaffold';
import { ServiceEmitter, ServiceListener, ServiceType } from './service-types';

/**
 * A service for interacting with Flowdock via their SDK
 */
export class FlowdockService extends ServiceScaffold<string> implements ServiceEmitter, ServiceListener {
	private readonly session: Session;
	private postsSynced = new Set<number>();

	constructor(data: FlowdockConstructor, logger: Logger) {
		super(data, logger);
		this.session = new Session(data.token);
		// The flowdock service both emits and calls back the error
		// We'll just log the emit to prevent it bubbling
		this.session.on('error', _.partial(console.log, 'Error in Flowdock service.'));
		if (data.type === ServiceType.Listener) {
			this.fetchFlowsAndConnect();
		}
	}

	protected fetchFlowsAndConnect(): void {
		this.session.flows((error: any, flows: any) => {
			if (error) {
				this.logger.alert(LogLevel.WARN, `Problem connecting to Flowdock, ${error}`);
			}
			// Enclose a list of flow names
			const flowIdToFlowName: {[key: string]: string} = {};
			for (const flow of flows) {
				flowIdToFlowName[flow.id] = `${flow.organization.parameterized_name}/${flow.parameterized_name}`;
			}
			const stream = this.session.stream(Object.keys(flowIdToFlowName), {active: 'idle', user: 1});
			this.logger.log(LogLevel.INFO, `Connected to Flowdock.`);
			// Disconnect logic lifted from https://github.com/flowdock/hubot-flowdock/blob/master/src/flowdock.coffee
			stream.on('disconnected', () => {
				this.logger.log(LogLevel.INFO, `Disconnected from Flowdock.`);
				stream.end();
				stream.removeAllListeners();
				this.fetchFlowsAndConnect();
			});
			stream.on('message', (message: any) => {
				if (!this.postsSynced.has(message.id)) {
					this.postsSynced.add(message.id);
					this.queueData({
						context: message.thread_id,
						cookedEvent: {
							flow: flowIdToFlowName[message.flow],
						},
						type: message.event,
						rawEvent: message,
						source: this.serviceName,
					});
				}
			});
		});
	}

	/**
	 * Actually emit the data to the SDK.
	 * Extracting the context will have been done by the serviceScaffold.
	 * @param context  Context to be emitted
	 * @returns        Promise that resolves to the SDK response
	 */
	protected emitData(context: FlowdockEmitContext): Promise<FlowdockResponse> {
		return new Promise<FlowdockResponse>((resolve, reject) => {
			context.method(
				context.data.path, context.data.payload,
				(error: Error, response: FlowdockResponse) => {
					if (error) {
						try {
							// Attempt to stringify response so that the full object is printed on error
							response = JSON.stringify(response);
						} finally {
							reject(new Error(`${error}: ${response}`));
						}
					} else {
						resolve(response);
					}
				}
			);
		});
	}

	/**
		* Verify the event before enqueueing. Since we connect to a web stream we can assume events are legitimate.
		*/
	protected verify(): boolean {
		return true;
	}

	/**
	 * Retrieve the SDK API handle for Flowdock.
	 * @returns  The Flowdock SDK API handle.
	 */
	get apiHandle(): FlowdockHandle {
		return {
			flowdock: this.session
		};
	}
}

/**
 * Build this class, typed and activated as a listener.
 * @returns  Service Listener object, awakened and ready to go.
 */
export function createServiceListener(data: FlowdockConstructor, logger: Logger): ServiceListener {
	return new FlowdockService(data, logger);
}

/**
 * Build this class, typed as an emitter.
 * @returns  Service Emitter object, ready for your events.
 */
export function createServiceEmitter(data: FlowdockConstructor, logger: Logger): ServiceEmitter {
	return new FlowdockService(data, logger);
}
