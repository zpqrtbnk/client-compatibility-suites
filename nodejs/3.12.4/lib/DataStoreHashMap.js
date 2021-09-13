"use strict";
/*
 * Copyright (c) 2008-2020, Hazelcast, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var DataKeyedHashMap = /** @class */ (function () {
    function DataKeyedHashMap() {
        this.internalStore = new Map();
        this.size = 0;
    }
    DataKeyedHashMap.prototype.clear = function () {
        this.size = 0;
        this.internalStore = new Map();
    };
    DataKeyedHashMap.prototype.delete = function (key) {
        var existingIndex = this.findIndexInBucket(key);
        if (existingIndex === -1) {
            return false;
        }
        else {
            this.getOrCreateBucket(key.hashCode()).splice(existingIndex, 1);
            this.size--;
            return true;
        }
    };
    DataKeyedHashMap.prototype.has = function (key) {
        return this.findIndexInBucket(key) !== -1;
    };
    DataKeyedHashMap.prototype.get = function (key) {
        var keyHash = key.hashCode();
        var existingIndex = this.findIndexInBucket(key);
        if (existingIndex !== -1) {
            return this.getOrCreateBucket(keyHash)[existingIndex].value;
        }
        else {
            return undefined;
        }
    };
    DataKeyedHashMap.prototype.set = function (key, value) {
        var keyHash = key.hashCode();
        var existingIndex = this.findIndexInBucket(key);
        if (existingIndex !== -1) {
            this.getOrCreateBucket(keyHash)[existingIndex].value = value;
        }
        else {
            this.getOrCreateBucket(keyHash).push({ key: key, value: value });
            this.size++;
        }
        return this;
    };
    DataKeyedHashMap.prototype.values = function () {
        var snapshot = [];
        this.internalStore.forEach(function (bucket) {
            snapshot.push.apply(snapshot, (bucket.map(function (item) { return item.value; })));
        });
        return snapshot;
    };
    DataKeyedHashMap.prototype.entries = function () {
        var snapshot = [];
        this.internalStore.forEach(function (bucket) {
            snapshot.push.apply(snapshot, (bucket.map(function (item) {
                return [item.key, item.value];
            })));
        });
        return snapshot;
    };
    /**
     *
     * @param key
     * @returns index of the key if it exists, -1 if either bucket or item does not exist
     */
    DataKeyedHashMap.prototype.findIndexInBucket = function (key) {
        var keyHash = key.hashCode();
        var bucket = this.internalStore.get(keyHash);
        if (bucket === undefined) {
            return -1;
        }
        else {
            return bucket.findIndex(function (item) {
                return item.key.equals(key);
            });
        }
    };
    DataKeyedHashMap.prototype.getOrCreateBucket = function (key) {
        var bucket;
        bucket = this.internalStore.get(key);
        if (bucket === undefined) {
            bucket = [];
            this.internalStore.set(key, bucket);
        }
        return bucket;
    };
    return DataKeyedHashMap;
}());
exports.DataKeyedHashMap = DataKeyedHashMap;
var InternalRecord = /** @class */ (function () {
    function InternalRecord() {
    }
    return InternalRecord;
}());
