/// <reference types="long" />
/// <reference types="bluebird" />
import * as Promise from 'bluebird';
import * as Long from 'long';
import { DistributedObject } from '../DistributedObject';
export interface IAtomicLong extends DistributedObject {
    addAndGet(delta: Long | number): Promise<Long>;
    compareAndSet(expect: Long | number, update: Long | number): Promise<boolean>;
    decrementAndGet(): Promise<Long>;
    get(): Promise<Long>;
    getAndAdd(delta: Long | number): Promise<Long>;
    getAndSet(newValue: Long | number): Promise<Long>;
    incrementAndGet(): Promise<Long>;
    getAndIncrement(): Promise<Long>;
    set(newValue: Long | number): Promise<void>;
}
