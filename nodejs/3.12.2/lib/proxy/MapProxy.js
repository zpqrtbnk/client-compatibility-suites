"use strict";
/*
 * Copyright (c) 2008-2019, Hazelcast, Inc. All Rights Reserved.
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var MapAddEntryListenerCodec_1 = require("../codec/MapAddEntryListenerCodec");
var MapAddEntryListenerToKeyCodec_1 = require("../codec/MapAddEntryListenerToKeyCodec");
var MapAddEntryListenerToKeyWithPredicateCodec_1 = require("../codec/MapAddEntryListenerToKeyWithPredicateCodec");
var MapAddEntryListenerWithPredicateCodec_1 = require("../codec/MapAddEntryListenerWithPredicateCodec");
var MapAddIndexCodec_1 = require("../codec/MapAddIndexCodec");
var MapAggregateCodec_1 = require("../codec/MapAggregateCodec");
var MapAggregateWithPredicateCodec_1 = require("../codec/MapAggregateWithPredicateCodec");
var MapClearCodec_1 = require("../codec/MapClearCodec");
var MapContainsKeyCodec_1 = require("../codec/MapContainsKeyCodec");
var MapContainsValueCodec_1 = require("../codec/MapContainsValueCodec");
var MapDeleteCodec_1 = require("../codec/MapDeleteCodec");
var MapEntriesWithPredicateCodec_1 = require("../codec/MapEntriesWithPredicateCodec");
var MapEntrySetCodec_1 = require("../codec/MapEntrySetCodec");
var MapEvictAllCodec_1 = require("../codec/MapEvictAllCodec");
var MapEvictCodec_1 = require("../codec/MapEvictCodec");
var MapExecuteOnAllKeysCodec_1 = require("../codec/MapExecuteOnAllKeysCodec");
var MapExecuteOnKeyCodec_1 = require("../codec/MapExecuteOnKeyCodec");
var MapExecuteOnKeysCodec_1 = require("../codec/MapExecuteOnKeysCodec");
var MapExecuteWithPredicateCodec_1 = require("../codec/MapExecuteWithPredicateCodec");
var MapFlushCodec_1 = require("../codec/MapFlushCodec");
var MapForceUnlockCodec_1 = require("../codec/MapForceUnlockCodec");
var MapGetAllCodec_1 = require("../codec/MapGetAllCodec");
var MapGetCodec_1 = require("../codec/MapGetCodec");
var MapGetEntryViewCodec_1 = require("../codec/MapGetEntryViewCodec");
var MapIsEmptyCodec_1 = require("../codec/MapIsEmptyCodec");
var MapIsLockedCodec_1 = require("../codec/MapIsLockedCodec");
var MapKeySetCodec_1 = require("../codec/MapKeySetCodec");
var MapKeySetWithPagingPredicateCodec_1 = require("../codec/MapKeySetWithPagingPredicateCodec");
var MapKeySetWithPredicateCodec_1 = require("../codec/MapKeySetWithPredicateCodec");
var MapLoadAllCodec_1 = require("../codec/MapLoadAllCodec");
var MapLoadGivenKeysCodec_1 = require("../codec/MapLoadGivenKeysCodec");
var MapLockCodec_1 = require("../codec/MapLockCodec");
var MapPutAllCodec_1 = require("../codec/MapPutAllCodec");
var MapPutCodec_1 = require("../codec/MapPutCodec");
var MapPutIfAbsentCodec_1 = require("../codec/MapPutIfAbsentCodec");
var MapPutTransientCodec_1 = require("../codec/MapPutTransientCodec");
var MapRemoveCodec_1 = require("../codec/MapRemoveCodec");
var MapRemoveEntryListenerCodec_1 = require("../codec/MapRemoveEntryListenerCodec");
var MapRemoveIfSameCodec_1 = require("../codec/MapRemoveIfSameCodec");
var MapReplaceCodec_1 = require("../codec/MapReplaceCodec");
var MapReplaceIfSameCodec_1 = require("../codec/MapReplaceIfSameCodec");
var MapSetCodec_1 = require("../codec/MapSetCodec");
var MapSizeCodec_1 = require("../codec/MapSizeCodec");
var MapTryLockCodec_1 = require("../codec/MapTryLockCodec");
var MapTryPutCodec_1 = require("../codec/MapTryPutCodec");
var MapTryRemoveCodec_1 = require("../codec/MapTryRemoveCodec");
var MapUnlockCodec_1 = require("../codec/MapUnlockCodec");
var MapValuesCodec_1 = require("../codec/MapValuesCodec");
var MapValuesWithPagingPredicateCodec_1 = require("../codec/MapValuesWithPagingPredicateCodec");
var MapValuesWithPredicateCodec_1 = require("../codec/MapValuesWithPredicateCodec");
var EventType_1 = require("../core/EventType");
var MapListener_1 = require("../core/MapListener");
var Predicate_1 = require("../core/Predicate");
var ReadOnlyLazyList_1 = require("../core/ReadOnlyLazyList");
var DefaultPredicates_1 = require("../serialization/DefaultPredicates");
var SerializationUtil = require("../serialization/SerializationUtil");
var Util_1 = require("../Util");
var BaseProxy_1 = require("./BaseProxy");
var EntryListener_1 = require("../core/EntryListener");
var MapProxy = /** @class */ (function (_super) {
    __extends(MapProxy, _super);
    function MapProxy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapProxy.prototype.aggregate = function (aggregator) {
        Util_1.assertNotNull(aggregator);
        var aggregatorData = this.toData(aggregator);
        return this.encodeInvokeOnRandomTarget(MapAggregateCodec_1.MapAggregateCodec, aggregatorData);
    };
    MapProxy.prototype.aggregateWithPredicate = function (aggregator, predicate) {
        Util_1.assertNotNull(aggregator);
        Util_1.assertNotNull(predicate);
        this.checkNotPagingPredicate(predicate);
        var aggregatorData = this.toData(aggregator);
        var predicateData = this.toData(predicate);
        return this.encodeInvokeOnRandomTarget(MapAggregateWithPredicateCodec_1.MapAggregateWithPredicateCodec, aggregatorData, predicateData);
    };
    MapProxy.prototype.executeOnKeys = function (keys, entryProcessor) {
        Util_1.assertNotNull(keys);
        Util_1.assertArray(keys);
        if (keys.length === 0) {
            return Promise.resolve([]);
        }
        else {
            var toObject = this.toObject.bind(this);
            var keysData = SerializationUtil.serializeList(this.toData.bind(this), keys);
            var proData = this.toData(entryProcessor);
            return this.encodeInvokeOnRandomTarget(MapExecuteOnKeysCodec_1.MapExecuteOnKeysCodec, proData, keysData)
                .then(SerializationUtil.deserializeEntryList.bind(this, toObject));
        }
    };
    MapProxy.prototype.executeOnKey = function (key, entryProcessor) {
        Util_1.assertNotNull(key);
        Util_1.assertNotNull(entryProcessor);
        var keyData = this.toData(key);
        var proData = this.toData(entryProcessor);
        return this.executeOnKeyInternal(keyData, proData);
    };
    MapProxy.prototype.executeOnEntries = function (entryProcessor, predicate) {
        if (predicate === void 0) { predicate = null; }
        Util_1.assertNotNull(entryProcessor);
        var proData = this.toData(entryProcessor);
        var toObject = this.toObject.bind(this);
        if (predicate == null) {
            return this.encodeInvokeOnRandomTarget(MapExecuteOnAllKeysCodec_1.MapExecuteOnAllKeysCodec, proData)
                .then(SerializationUtil.deserializeEntryList.bind(this, toObject));
        }
        else {
            var predData = this.toData(predicate);
            return this.encodeInvokeOnRandomTarget(MapExecuteWithPredicateCodec_1.MapExecuteWithPredicateCodec, proData, predData)
                .then(SerializationUtil.deserializeEntryList.bind(this, toObject));
        }
    };
    MapProxy.prototype.entrySetWithPredicate = function (predicate) {
        Util_1.assertNotNull(predicate);
        var toObject = this.toObject.bind(this);
        if (predicate instanceof DefaultPredicates_1.PagingPredicate) {
            predicate.setIterationType(Predicate_1.IterationType.ENTRY);
            var pData = this.toData(predicate);
            return this.encodeInvokeOnRandomTarget(MapValuesWithPagingPredicateCodec_1.MapValuesWithPagingPredicateCodec, pData).then(function (rawValues) {
                var deserValues = rawValues.map(function (ite) {
                    return [toObject(ite[0]), toObject(ite[1])];
                });
                return Util_1.getSortedQueryResultSet(deserValues, predicate);
            });
        }
        else {
            var pData = this.toData(predicate);
            var deserializedSet_1 = [];
            return this.encodeInvokeOnRandomTarget(MapEntriesWithPredicateCodec_1.MapEntriesWithPredicateCodec, pData).then(function (entrySet) {
                entrySet.forEach(function (entry) {
                    deserializedSet_1.push([toObject(entry[0]), toObject(entry[1])]);
                });
                return deserializedSet_1;
            });
        }
    };
    MapProxy.prototype.keySetWithPredicate = function (predicate) {
        Util_1.assertNotNull(predicate);
        var toObject = this.toObject.bind(this);
        if (predicate instanceof DefaultPredicates_1.PagingPredicate) {
            predicate.setIterationType(Predicate_1.IterationType.KEY);
            var predData = this.toData(predicate);
            return this.encodeInvokeOnRandomTarget(MapKeySetWithPagingPredicateCodec_1.MapKeySetWithPagingPredicateCodec, predData).then(function (rawValues) {
                var deserValues = rawValues.map(function (ite) {
                    return [toObject(ite), null];
                });
                return Util_1.getSortedQueryResultSet(deserValues, predicate);
            });
        }
        else {
            var predicateData = this.toData(predicate);
            return this.encodeInvokeOnRandomTarget(MapKeySetWithPredicateCodec_1.MapKeySetWithPredicateCodec, predicateData).then(function (entrySet) {
                return entrySet.map(toObject);
            });
        }
    };
    MapProxy.prototype.valuesWithPredicate = function (predicate) {
        var _this = this;
        Util_1.assertNotNull(predicate);
        var toObject = this.toObject.bind(this);
        if (predicate instanceof DefaultPredicates_1.PagingPredicate) {
            predicate.setIterationType(Predicate_1.IterationType.VALUE);
            var predData = this.toData(predicate);
            return this.encodeInvokeOnRandomTarget(MapValuesWithPagingPredicateCodec_1.MapValuesWithPagingPredicateCodec, predData).then(function (rawValues) {
                var desValues = rawValues.map(function (ite) {
                    return [toObject(ite[0]), toObject(ite[1])];
                });
                return new ReadOnlyLazyList_1.ReadOnlyLazyList(Util_1.getSortedQueryResultSet(desValues, predicate), _this.client.getSerializationService());
            });
        }
        else {
            var predicateData = this.toData(predicate);
            return this.encodeInvokeOnRandomTarget(MapValuesWithPredicateCodec_1.MapValuesWithPredicateCodec, predicateData).then(function (rawValues) {
                return new ReadOnlyLazyList_1.ReadOnlyLazyList(rawValues, _this.client.getSerializationService());
            });
        }
    };
    MapProxy.prototype.addEntryListenerWithPredicate = function (listener, predicate, key, includeValue) {
        return this.addEntryListenerInternal(listener, predicate, key, includeValue);
    };
    MapProxy.prototype.containsKey = function (key) {
        Util_1.assertNotNull(key);
        var keyData = this.toData(key);
        return this.containsKeyInternal(keyData);
    };
    MapProxy.prototype.containsValue = function (value) {
        Util_1.assertNotNull(value);
        var valueData = this.toData(value);
        return this.encodeInvokeOnRandomTarget(MapContainsValueCodec_1.MapContainsValueCodec, valueData);
    };
    MapProxy.prototype.put = function (key, value, ttl) {
        if (ttl === void 0) { ttl = -1; }
        Util_1.assertNotNull(key);
        Util_1.assertNotNull(value);
        var keyData = this.toData(key);
        var valueData = this.toData(value);
        return this.putInternal(keyData, valueData, ttl);
    };
    MapProxy.prototype.putAll = function (pairs) {
        var partitionService = this.client.getPartitionService();
        var partitionsToKeys = {};
        var pair;
        var pairId;
        for (pairId in pairs) {
            pair = pairs[pairId];
            var keyData = this.toData(pair[0]);
            var pId = partitionService.getPartitionId(keyData);
            if (!partitionsToKeys[pId]) {
                partitionsToKeys[pId] = [];
            }
            partitionsToKeys[pId].push([keyData, this.toData(pair[1])]);
        }
        return this.putAllInternal(partitionsToKeys);
    };
    MapProxy.prototype.get = function (key) {
        Util_1.assertNotNull(key);
        var keyData = this.toData(key);
        return this.getInternal(keyData);
    };
    MapProxy.prototype.remove = function (key, value) {
        if (value === void 0) { value = null; }
        Util_1.assertNotNull(key);
        var keyData = this.toData(key);
        return this.removeInternal(keyData, value);
    };
    MapProxy.prototype.size = function () {
        return this.encodeInvokeOnRandomTarget(MapSizeCodec_1.MapSizeCodec);
    };
    MapProxy.prototype.clear = function () {
        return this.encodeInvokeOnRandomTarget(MapClearCodec_1.MapClearCodec);
    };
    MapProxy.prototype.isEmpty = function () {
        return this.encodeInvokeOnRandomTarget(MapIsEmptyCodec_1.MapIsEmptyCodec);
    };
    MapProxy.prototype.getAll = function (keys) {
        Util_1.assertNotNull(keys);
        Util_1.assertArray(keys);
        var partitionService = this.client.getPartitionService();
        var partitionsToKeys = {};
        var key;
        for (var i in keys) {
            key = keys[i];
            var keyData = this.toData(key);
            var pId = partitionService.getPartitionId(keyData);
            if (!partitionsToKeys[pId]) {
                partitionsToKeys[pId] = [];
            }
            partitionsToKeys[pId].push(keyData);
        }
        var result = [];
        return this.getAllInternal(partitionsToKeys, result).then(function () {
            return result;
        });
    };
    MapProxy.prototype.delete = function (key) {
        Util_1.assertNotNull(key);
        var keyData = this.toData(key);
        return this.deleteInternal(keyData);
    };
    MapProxy.prototype.entrySet = function () {
        var deserializedSet = [];
        var toObject = this.toObject.bind(this);
        return this.encodeInvokeOnRandomTarget(MapEntrySetCodec_1.MapEntrySetCodec).then(function (entrySet) {
            entrySet.forEach(function (entry) {
                deserializedSet.push([toObject(entry[0]), toObject(entry[1])]);
            });
            return deserializedSet;
        });
    };
    MapProxy.prototype.evict = function (key) {
        Util_1.assertNotNull(key);
        var keyData = this.toData(key);
        return this.evictInternal(keyData);
    };
    MapProxy.prototype.evictAll = function () {
        return this.encodeInvokeOnRandomTarget(MapEvictAllCodec_1.MapEvictAllCodec);
    };
    MapProxy.prototype.flush = function () {
        return this.encodeInvokeOnRandomTarget(MapFlushCodec_1.MapFlushCodec);
    };
    MapProxy.prototype.lock = function (key, ttl) {
        if (ttl === void 0) { ttl = -1; }
        Util_1.assertNotNull(key);
        var keyData = this.toData(key);
        return this.encodeInvokeOnKey(MapLockCodec_1.MapLockCodec, keyData, keyData, 0, ttl, 0);
    };
    MapProxy.prototype.isLocked = function (key) {
        Util_1.assertNotNull(key);
        var keyData = this.toData(key);
        return this.encodeInvokeOnKey(MapIsLockedCodec_1.MapIsLockedCodec, keyData, keyData);
    };
    MapProxy.prototype.unlock = function (key) {
        Util_1.assertNotNull(key);
        var keyData = this.toData(key);
        return this.encodeInvokeOnKey(MapUnlockCodec_1.MapUnlockCodec, keyData, keyData, 0, 0);
    };
    MapProxy.prototype.forceUnlock = function (key) {
        Util_1.assertNotNull(key);
        var keyData = this.toData(key);
        return this.encodeInvokeOnKey(MapForceUnlockCodec_1.MapForceUnlockCodec, keyData, keyData, 0);
    };
    MapProxy.prototype.keySet = function () {
        var toObject = this.toObject.bind(this);
        return this.encodeInvokeOnRandomTarget(MapKeySetCodec_1.MapKeySetCodec).then(function (entrySet) {
            return entrySet.map(toObject);
        });
    };
    MapProxy.prototype.loadAll = function (keys, replaceExistingValues) {
        if (keys === void 0) { keys = null; }
        if (replaceExistingValues === void 0) { replaceExistingValues = true; }
        if (keys == null) {
            return this.encodeInvokeOnRandomTarget(MapLoadAllCodec_1.MapLoadAllCodec, replaceExistingValues);
        }
        else {
            var toData = this.toData.bind(this);
            var keysData = keys.map(toData);
            return this.encodeInvokeOnRandomTarget(MapLoadGivenKeysCodec_1.MapLoadGivenKeysCodec, keysData, replaceExistingValues);
        }
    };
    MapProxy.prototype.putIfAbsent = function (key, value, ttl) {
        if (ttl === void 0) { ttl = -1; }
        Util_1.assertNotNull(key);
        Util_1.assertNotNull(value);
        var keyData = this.toData(key);
        var valueData = this.toData(value);
        return this.putIfAbsentInternal(keyData, valueData, ttl);
    };
    MapProxy.prototype.putTransient = function (key, value, ttl) {
        if (ttl === void 0) { ttl = -1; }
        Util_1.assertNotNull(key);
        Util_1.assertNotNull(value);
        var keyData = this.toData(key);
        var valueData = this.toData(value);
        return this.putTransientInternal(keyData, valueData, ttl);
    };
    MapProxy.prototype.replace = function (key, newValue) {
        Util_1.assertNotNull(key);
        Util_1.assertNotNull(newValue);
        var keyData = this.toData(key);
        var newValueData = this.toData(newValue);
        return this.replaceInternal(keyData, newValueData);
    };
    MapProxy.prototype.replaceIfSame = function (key, oldValue, newValue) {
        Util_1.assertNotNull(key);
        Util_1.assertNotNull(oldValue);
        Util_1.assertNotNull(newValue);
        var keyData = this.toData(key);
        var newValueData = this.toData(newValue);
        var oldValueData = this.toData(oldValue);
        return this.replaceIfSameInternal(keyData, oldValueData, newValueData);
    };
    MapProxy.prototype.set = function (key, value, ttl) {
        if (ttl === void 0) { ttl = -1; }
        Util_1.assertNotNull(key);
        Util_1.assertNotNull(value);
        var keyData = this.toData(key);
        var valueData = this.toData(value);
        return this.setInternal(keyData, valueData, ttl);
    };
    MapProxy.prototype.values = function () {
        var _this = this;
        return this.encodeInvokeOnRandomTarget(MapValuesCodec_1.MapValuesCodec).then(function (valuesData) {
            return new ReadOnlyLazyList_1.ReadOnlyLazyList(valuesData, _this.client.getSerializationService());
        });
    };
    MapProxy.prototype.getEntryView = function (key) {
        Util_1.assertNotNull(key);
        var keyData = this.toData(key);
        return this.encodeInvokeOnKey(MapGetEntryViewCodec_1.MapGetEntryViewCodec, keyData, keyData, 0);
    };
    MapProxy.prototype.addIndex = function (attribute, ordered) {
        return this.encodeInvokeOnRandomTarget(MapAddIndexCodec_1.MapAddIndexCodec, attribute, ordered);
    };
    MapProxy.prototype.tryLock = function (key, timeout, lease) {
        if (timeout === void 0) { timeout = 0; }
        if (lease === void 0) { lease = -1; }
        Util_1.assertNotNull(key);
        var keyData = this.toData(key);
        return this.encodeInvokeOnKey(MapTryLockCodec_1.MapTryLockCodec, keyData, keyData, 0, lease, timeout, 0);
    };
    MapProxy.prototype.tryPut = function (key, value, timeout) {
        Util_1.assertNotNull(key);
        Util_1.assertNotNull(value);
        var keyData = this.toData(key);
        var valueData = this.toData(value);
        return this.tryPutInternal(keyData, valueData, timeout);
    };
    MapProxy.prototype.tryRemove = function (key, timeout) {
        Util_1.assertNotNull(key);
        var keyData = this.toData(key);
        return this.tryRemoveInternal(keyData, timeout);
    };
    MapProxy.prototype.addEntryListener = function (listener, key, includeValue) {
        if (includeValue === void 0) { includeValue = false; }
        return this.addEntryListenerInternal(listener, undefined, key, includeValue);
    };
    MapProxy.prototype.removeEntryListener = function (listenerId) {
        return this.client.getListenerService().deregisterListener(listenerId);
    };
    MapProxy.prototype.executeOnKeyInternal = function (keyData, proData) {
        return this.encodeInvokeOnKey(MapExecuteOnKeyCodec_1.MapExecuteOnKeyCodec, keyData, proData, keyData, 1);
    };
    MapProxy.prototype.containsKeyInternal = function (keyData) {
        return this.encodeInvokeOnKey(MapContainsKeyCodec_1.MapContainsKeyCodec, keyData, keyData, 0);
    };
    MapProxy.prototype.putInternal = function (keyData, valueData, ttl) {
        return this.encodeInvokeOnKey(MapPutCodec_1.MapPutCodec, keyData, keyData, valueData, 0, ttl);
    };
    MapProxy.prototype.putAllInternal = function (partitionsToKeysData) {
        var partitionPromises = [];
        for (var partition in partitionsToKeysData) {
            partitionPromises.push(this.encodeInvokeOnPartition(MapPutAllCodec_1.MapPutAllCodec, Number(partition), partitionsToKeysData[partition]));
        }
        return Promise.all(partitionPromises).then(function () {
            return;
        });
    };
    MapProxy.prototype.getInternal = function (keyData) {
        return this.encodeInvokeOnKey(MapGetCodec_1.MapGetCodec, keyData, keyData, 0);
    };
    MapProxy.prototype.removeInternal = function (keyData, value) {
        if (value === void 0) { value = null; }
        if (value == null) {
            return this.encodeInvokeOnKey(MapRemoveCodec_1.MapRemoveCodec, keyData, keyData, 0);
        }
        else {
            var valueData = this.toData(value);
            return this.encodeInvokeOnKey(MapRemoveIfSameCodec_1.MapRemoveIfSameCodec, keyData, keyData, valueData, 0);
        }
    };
    MapProxy.prototype.getAllInternal = function (partitionsToKeys, result) {
        if (result === void 0) { result = []; }
        var partitionPromises = [];
        for (var partition in partitionsToKeys) {
            partitionPromises.push(this.encodeInvokeOnPartition(MapGetAllCodec_1.MapGetAllCodec, Number(partition), partitionsToKeys[partition]));
        }
        var toObject = this.toObject.bind(this);
        var deserializeEntry = function (entry) {
            return [toObject(entry[0]), toObject(entry[1])];
        };
        return Promise.all(partitionPromises).then(function (serializedEntryArrayArray) {
            var serializedEntryArray = Array.prototype.concat.apply([], serializedEntryArrayArray);
            result.push.apply(result, (serializedEntryArray.map(deserializeEntry)));
            return serializedEntryArray;
        });
    };
    MapProxy.prototype.deleteInternal = function (keyData) {
        return this.encodeInvokeOnKey(MapDeleteCodec_1.MapDeleteCodec, keyData, keyData, 0);
    };
    MapProxy.prototype.evictInternal = function (keyData) {
        return this.encodeInvokeOnKey(MapEvictCodec_1.MapEvictCodec, keyData, keyData, 0);
    };
    MapProxy.prototype.putIfAbsentInternal = function (keyData, valueData, ttl) {
        return this.encodeInvokeOnKey(MapPutIfAbsentCodec_1.MapPutIfAbsentCodec, keyData, keyData, valueData, 0, ttl);
    };
    MapProxy.prototype.putTransientInternal = function (keyData, valueData, ttl) {
        return this.encodeInvokeOnKey(MapPutTransientCodec_1.MapPutTransientCodec, keyData, keyData, valueData, 0, ttl);
    };
    MapProxy.prototype.replaceInternal = function (keyData, newValueData) {
        return this.encodeInvokeOnKey(MapReplaceCodec_1.MapReplaceCodec, keyData, keyData, newValueData, 0);
    };
    MapProxy.prototype.replaceIfSameInternal = function (keyData, oldValueData, newValueData) {
        return this.encodeInvokeOnKey(MapReplaceIfSameCodec_1.MapReplaceIfSameCodec, keyData, keyData, oldValueData, newValueData, 0);
    };
    MapProxy.prototype.setInternal = function (keyData, valueData, ttl) {
        return this.encodeInvokeOnKey(MapSetCodec_1.MapSetCodec, keyData, keyData, valueData, 0, ttl);
    };
    MapProxy.prototype.tryPutInternal = function (keyData, valueData, timeout) {
        return this.encodeInvokeOnKey(MapTryPutCodec_1.MapTryPutCodec, keyData, keyData, valueData, 0, timeout);
    };
    MapProxy.prototype.tryRemoveInternal = function (keyData, timeout) {
        return this.encodeInvokeOnKey(MapTryRemoveCodec_1.MapTryRemoveCodec, keyData, keyData, 0, timeout);
    };
    MapProxy.prototype.addEntryListenerInternal = function (listener, predicate, key, includeValue) {
        var _this = this;
        var flags = null;
        var conversionTable = {
            added: EventType_1.EventType.ADDED,
            mapCleared: EventType_1.EventType.CLEAR_ALL,
            evicted: EventType_1.EventType.EVICTED,
            mapEvicted: EventType_1.EventType.EVICT_ALL,
            merged: EventType_1.EventType.MERGED,
            removed: EventType_1.EventType.REMOVED,
            updated: EventType_1.EventType.UPDATED,
        };
        for (var funcName in conversionTable) {
            if (listener[funcName]) {
                /* tslint:disable:no-bitwise */
                flags = flags | conversionTable[funcName];
            }
        }
        var toObject = this.toObject.bind(this);
        var entryEventHandler = function (
            /* tslint:disable-next-line:no-shadowed-variable */
            key, value, oldValue, mergingValue, eventType, uuid, numberOfAffectedEntries) {
            var member = _this.client.getClusterService().getMember(uuid);
            var name = _this.name;
            key = toObject(key);
            value = toObject(value);
            oldValue = toObject(oldValue);
            mergingValue = toObject(mergingValue);
            var entryEvent = new EntryListener_1.EntryEvent(name, key, value, oldValue, mergingValue, member);
            var mapEvent = new MapListener_1.MapEvent(name, numberOfAffectedEntries, member);
            switch (eventType) {
                case EventType_1.EventType.ADDED:
                    listener.added.apply(null, [entryEvent]);
                    break;
                case EventType_1.EventType.REMOVED:
                    listener.removed.apply(null, [entryEvent]);
                    break;
                case EventType_1.EventType.UPDATED:
                    listener.updated.apply(null, [entryEvent]);
                    break;
                case EventType_1.EventType.EVICTED:
                    listener.evicted.apply(null, [entryEvent]);
                    break;
                case EventType_1.EventType.EVICT_ALL:
                    listener.mapEvicted.apply(null, [mapEvent]);
                    break;
                case EventType_1.EventType.CLEAR_ALL:
                    listener.mapCleared.apply(null, [mapEvent]);
                    break;
                case EventType_1.EventType.MERGED:
                    listener.merged.apply(null, [entryEvent]);
                    break;
            }
        };
        var codec;
        var listenerHandler;
        if (key && predicate) {
            var keyData = this.toData(key);
            var predicateData = this.toData(predicate);
            codec = this.createEntryListenerToKeyWithPredicate(this.name, keyData, predicateData, includeValue, flags);
            listenerHandler = MapAddEntryListenerToKeyWithPredicateCodec_1.MapAddEntryListenerToKeyWithPredicateCodec.handle;
        }
        else if (key && !predicate) {
            var keyData = this.toData(key);
            codec = this.createEntryListenerToKey(this.name, keyData, includeValue, flags);
            listenerHandler = MapAddEntryListenerToKeyCodec_1.MapAddEntryListenerToKeyCodec.handle;
        }
        else if (!key && predicate) {
            var predicateData = this.toData(predicate);
            codec = this.createEntryListenerWithPredicate(this.name, predicateData, includeValue, flags);
            listenerHandler = MapAddEntryListenerWithPredicateCodec_1.MapAddEntryListenerWithPredicateCodec.handle;
        }
        else {
            codec = this.createEntryListener(this.name, includeValue, flags);
            listenerHandler = MapAddEntryListenerCodec_1.MapAddEntryListenerCodec.handle;
        }
        return this.client.getListenerService()
            .registerListener(codec, function (m) {
            listenerHandler(m, entryEventHandler, toObject);
        });
    };
    MapProxy.prototype.createEntryListenerToKey = function (name, keyData, includeValue, flags) {
        return {
            encodeAddRequest: function (localOnly) {
                return MapAddEntryListenerToKeyCodec_1.MapAddEntryListenerToKeyCodec.encodeRequest(name, keyData, includeValue, flags, localOnly);
            },
            decodeAddResponse: function (msg) {
                return MapAddEntryListenerToKeyCodec_1.MapAddEntryListenerToKeyCodec.decodeResponse(msg).response;
            },
            encodeRemoveRequest: function (listenerId) {
                return MapRemoveEntryListenerCodec_1.MapRemoveEntryListenerCodec.encodeRequest(name, listenerId);
            },
        };
    };
    MapProxy.prototype.createEntryListenerToKeyWithPredicate = function (name, keyData, predicateData, includeValue, flags) {
        return {
            encodeAddRequest: function (localOnly) {
                return MapAddEntryListenerToKeyWithPredicateCodec_1.MapAddEntryListenerToKeyWithPredicateCodec.encodeRequest(name, keyData, predicateData, includeValue, flags, localOnly);
            },
            decodeAddResponse: function (msg) {
                return MapAddEntryListenerToKeyWithPredicateCodec_1.MapAddEntryListenerToKeyWithPredicateCodec.decodeResponse(msg).response;
            },
            encodeRemoveRequest: function (listenerId) {
                return MapRemoveEntryListenerCodec_1.MapRemoveEntryListenerCodec.encodeRequest(name, listenerId);
            },
        };
    };
    MapProxy.prototype.createEntryListenerWithPredicate = function (name, predicateData, includeValue, flags) {
        return {
            encodeAddRequest: function (localOnly) {
                return MapAddEntryListenerWithPredicateCodec_1.MapAddEntryListenerWithPredicateCodec.encodeRequest(name, predicateData, includeValue, flags, localOnly);
            },
            decodeAddResponse: function (msg) {
                return MapAddEntryListenerWithPredicateCodec_1.MapAddEntryListenerWithPredicateCodec.decodeResponse(msg).response;
            },
            encodeRemoveRequest: function (listenerId) {
                return MapRemoveEntryListenerCodec_1.MapRemoveEntryListenerCodec.encodeRequest(name, listenerId);
            },
        };
    };
    MapProxy.prototype.createEntryListener = function (name, includeValue, flags) {
        return {
            encodeAddRequest: function (localOnly) {
                return MapAddEntryListenerCodec_1.MapAddEntryListenerCodec.encodeRequest(name, includeValue, flags, localOnly);
            },
            decodeAddResponse: function (msg) {
                return MapAddEntryListenerCodec_1.MapAddEntryListenerCodec.decodeResponse(msg).response;
            },
            encodeRemoveRequest: function (listenerId) {
                return MapRemoveEntryListenerCodec_1.MapRemoveEntryListenerCodec.encodeRequest(name, listenerId);
            },
        };
    };
    MapProxy.prototype.checkNotPagingPredicate = function (v) {
        if (v instanceof DefaultPredicates_1.PagingPredicate) {
            throw new RangeError('Paging predicate is not supported.');
        }
    };
    return MapProxy;
}(BaseProxy_1.BaseProxy));
exports.MapProxy = MapProxy;
//# sourceMappingURL=MapProxy.js.map