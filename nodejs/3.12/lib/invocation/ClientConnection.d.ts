/// <reference types="node" />
/// <reference types="bluebird" />
import { Buffer } from 'safe-buffer';
import * as Promise from 'bluebird';
import * as net from 'net';
import HazelcastClient from '../HazelcastClient';
import Address = require('../Address');
export declare class ClientConnection {
    private address;
    private readonly localAddress;
    private lastReadTimeMillis;
    private lastWriteTimeMillis;
    private heartbeating;
    private client;
    private readBuffer;
    private readonly startTime;
    private closedTime;
    private connectedServerVersionString;
    private connectedServerVersion;
    private authenticatedAsOwner;
    private socket;
    constructor(client: HazelcastClient, address: Address, socket: net.Socket);
    /**
     * Returns the address of local port that is associated with this connection.
     * @returns
     */
    getLocalAddress(): Address;
    /**
     * Returns the address of remote node that is associated with this connection.
     * @returns
     */
    getAddress(): Address;
    setAddress(address: Address): void;
    write(buffer: Buffer): Promise<void>;
    setConnectedServerVersion(versionString: string): void;
    getConnectedServerVersion(): number;
    /**
     * Closes this connection.
     */
    close(): void;
    isAlive(): boolean;
    isHeartbeating(): boolean;
    setHeartbeating(heartbeating: boolean): void;
    isAuthenticatedAsOwner(): boolean;
    setAuthenticatedAsOwner(asOwner: boolean): void;
    getStartTime(): number;
    getLastReadTimeMillis(): number;
    getLastWriteTimeMillis(): number;
    toString(): string;
    /**
     * Registers a function to pass received data on 'data' events on this connection.
     * @param callback
     */
    registerResponseCallback(callback: Function): void;
}
