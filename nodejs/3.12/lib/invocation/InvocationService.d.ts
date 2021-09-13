/// <reference types="bluebird" />
import { Buffer } from 'safe-buffer';
import * as Promise from 'bluebird';
import HazelcastClient from '../HazelcastClient';
import { ClientConnection } from './ClientConnection';
import Address = require('../Address');
import ClientMessage = require('../ClientMessage');
/**
 * A request to be sent to a hazelcast node.
 */
export declare class Invocation {
    client: HazelcastClient;
    invocationService: InvocationService;
    /**
     * Representatiton of the request in binary form.
     */
    request: ClientMessage;
    /**
     * Partition id of the request. If request is not bound to a specific partition, should be set to -1.
     */
    partitionId: number;
    /**
     * Address of the request. If request is not bound to any specific address, should be set to null.
     */
    address: Address;
    /**
     * Deadline of validity. Client will not try to send this request to server after the deadline passes.
     */
    deadline: Date;
    /**
     * Connection of the request. If request is not bound to any specific address, should be set to null.
     */
    connection: ClientConnection;
    /**
     * Promise managing object.
     */
    deferred: Promise.Resolver<ClientMessage>;
    invokeCount: number;
    /**
     * If this is an event listener registration, handler should be set to the function to be called on events.
     * Otherwise, should be set to null.
     */
    handler: (...args: any[]) => any;
    constructor(client: HazelcastClient, request: ClientMessage);
    static isRetrySafeError(err: Error): boolean;
    /**
     * @returns {boolean}
     */
    hasPartitionId(): boolean;
    isAllowedToRetryOnSelection(err: Error): boolean;
}
/**
 * Sends requests to appropriate nodes. Resolves waiting promises with responses.
 */
export declare class InvocationService {
    doInvoke: (invocation: Invocation) => void;
    private correlationCounter;
    private eventHandlers;
    private pending;
    private client;
    private smartRoutingEnabled;
    private readonly invocationRetryPauseMillis;
    private readonly invocationTimeoutMillis;
    private logger;
    private isShutdown;
    constructor(hazelcastClient: HazelcastClient);
    shutdown(): void;
    invoke(invocation: Invocation): Promise<ClientMessage>;
    /**
     * Invokes given invocation on specified connection.
     * @param connection
     * @param request
     * @param handler called with values returned from server for this invocation.
     * @returns
     */
    invokeOnConnection(connection: ClientConnection, request: ClientMessage, handler?: (...args: any[]) => any): Promise<ClientMessage>;
    /**
     * Invokes given invocation on the node that owns given partition.
     * @param request
     * @param partitionId
     * @returns
     */
    invokeOnPartition(request: ClientMessage, partitionId: number): Promise<ClientMessage>;
    /**
     * Invokes given invocation on the host with given address.
     * @param request
     * @param target
     * @returns
     */
    invokeOnTarget(request: ClientMessage, target: Address): Promise<ClientMessage>;
    /**
     * Invokes given invocation on any host.
     * Useful when an operation is not bound to any host but a generic operation.
     * @param request
     * @returns
     */
    invokeOnRandomTarget(request: ClientMessage): Promise<ClientMessage>;
    getInvocationTimeoutMillis(): number;
    getInvocationRetryPauseMillis(): number;
    /**
     * Removes the handler for all event handlers with a specific correlation id.
     * @param id correlation id
     */
    removeEventHandler(id: number): void;
    /**
     * Extract codec specific properties in a protocol message and resolves waiting promise.
     * @param buffer
     */
    processResponse(buffer: Buffer): void;
    private invokeSmart(invocation);
    private invokeNonSmart(invocation);
    private invokeOnOwner(invocation);
    private invokeOnAddress(invocation, address);
    private invokeOnPartitionOwner(invocation, partitionId);
    private send(invocation, connection);
    private write(invocation, connection);
    private notifyError(invocation, error);
    /**
     * Determines if an error is retryable. The given invocation is rejected with approprate error if the error is not retryable.
     * @param invocation
     * @param error
     * @returns `true` if invocation is rejected, `false` otherwise
     */
    private rejectIfNotRetryable(invocation, error);
    private registerInvocation(invocation);
}
