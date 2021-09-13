/// <reference types="node" />
import { EventEmitter } from 'events';
import HazelcastClient from './HazelcastClient';
/**
 * Lifecycle events.
 */
export declare let LifecycleEvent: {
    name: string;
    starting: string;
    started: string;
    shuttingDown: string;
    shutdown: string;
};
/**
 * LifecycleService
 */
export declare class LifecycleService extends EventEmitter {
    private active;
    private client;
    private logger;
    constructor(client: HazelcastClient);
    /**
     * Causes LifecycleService to emit given event to all registered listeners.
     * @param state
     */
    emitLifecycleEvent(state: string): void;
    /**
     * Returns the active state of the client.
     * @returns {boolean}
     */
    isRunning(): boolean;
}
