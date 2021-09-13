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
var QueueAddAllCodec_1 = require("../codec/QueueAddAllCodec");
var QueueAddListenerCodec_1 = require("../codec/QueueAddListenerCodec");
var QueueClearCodec_1 = require("../codec/QueueClearCodec");
var QueueCompareAndRemoveAllCodec_1 = require("../codec/QueueCompareAndRemoveAllCodec");
var QueueCompareAndRetainAllCodec_1 = require("../codec/QueueCompareAndRetainAllCodec");
var QueueContainsAllCodec_1 = require("../codec/QueueContainsAllCodec");
var QueueContainsCodec_1 = require("../codec/QueueContainsCodec");
var QueueDrainToCodec_1 = require("../codec/QueueDrainToCodec");
var QueueDrainToMaxSizeCodec_1 = require("../codec/QueueDrainToMaxSizeCodec");
var QueueIsEmptyCodec_1 = require("../codec/QueueIsEmptyCodec");
var QueueIteratorCodec_1 = require("../codec/QueueIteratorCodec");
var QueueOfferCodec_1 = require("../codec/QueueOfferCodec");
var QueuePeekCodec_1 = require("../codec/QueuePeekCodec");
var QueuePollCodec_1 = require("../codec/QueuePollCodec");
var QueuePutCodec_1 = require("../codec/QueuePutCodec");
var QueueRemainingCapacityCodec_1 = require("../codec/QueueRemainingCapacityCodec");
var QueueRemoveCodec_1 = require("../codec/QueueRemoveCodec");
var QueueRemoveListenerCodec_1 = require("../codec/QueueRemoveListenerCodec");
var QueueSizeCodec_1 = require("../codec/QueueSizeCodec");
var QueueTakeCodec_1 = require("../codec/QueueTakeCodec");
var ItemListener_1 = require("../core/ItemListener");
var HazelcastError_1 = require("../HazelcastError");
var PartitionSpecificProxy_1 = require("./PartitionSpecificProxy");
var QueueProxy = /** @class */ (function (_super) {
    __extends(QueueProxy, _super);
    function QueueProxy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueueProxy.prototype.add = function (item) {
        return this.offer(item).then(function (ret) {
            if (ret) {
                return true;
            }
            else {
                throw new HazelcastError_1.IllegalStateError('Queue is full.');
            }
        });
    };
    QueueProxy.prototype.addAll = function (items) {
        var rawList = [];
        var toData = this.toData.bind(this);
        items.forEach(function (item) {
            rawList.push(toData(item));
        });
        return this.encodeInvoke(QueueAddAllCodec_1.QueueAddAllCodec, rawList);
    };
    QueueProxy.prototype.addItemListener = function (listener, includeValue) {
        var _this = this;
        var handler = function (message) {
            QueueAddListenerCodec_1.QueueAddListenerCodec.handle(message, function (item, uuid, eventType) {
                var responseObject;
                if (item == null) {
                    responseObject = null;
                }
                else {
                    responseObject = _this.toObject(item);
                }
                var member = _this.client.getClusterService().getMember(uuid);
                var name = _this.name;
                var itemEvent = new ItemListener_1.ItemEvent(name, eventType, responseObject, member);
                if (eventType === ItemListener_1.ItemEventType.ADDED && listener.itemAdded) {
                    listener.itemAdded.apply(null, [itemEvent]);
                }
                else if (eventType === ItemListener_1.ItemEventType.REMOVED && listener.itemRemoved) {
                    listener.itemRemoved.apply(null, [itemEvent]);
                }
            });
        };
        var codec = this.createEntryListener(this.name, includeValue);
        return this.client.getListenerService().registerListener(codec, handler);
    };
    QueueProxy.prototype.clear = function () {
        return this.encodeInvoke(QueueClearCodec_1.QueueClearCodec);
    };
    QueueProxy.prototype.contains = function (item) {
        var itemData = this.toData(item);
        return this.encodeInvoke(QueueContainsCodec_1.QueueContainsCodec, itemData);
    };
    QueueProxy.prototype.containsAll = function (items) {
        var toData = this.toData.bind(this);
        var rawItems = items.map(toData);
        return this.encodeInvoke(QueueContainsAllCodec_1.QueueContainsAllCodec, rawItems);
    };
    QueueProxy.prototype.drainTo = function (arr, maxElements) {
        if (maxElements === void 0) { maxElements = null; }
        var toObject = this.toObject.bind(this);
        var promise;
        if (maxElements === null) {
            promise = this.encodeInvoke(QueueDrainToCodec_1.QueueDrainToCodec);
        }
        else {
            promise = this.encodeInvoke(QueueDrainToMaxSizeCodec_1.QueueDrainToMaxSizeCodec, maxElements);
        }
        return promise.then(function (rawArr) {
            rawArr.forEach(function (rawItem) {
                arr.push(toObject(rawItem));
            });
            return rawArr.length;
        });
    };
    QueueProxy.prototype.isEmpty = function () {
        return this.encodeInvoke(QueueIsEmptyCodec_1.QueueIsEmptyCodec);
    };
    QueueProxy.prototype.offer = function (item, time) {
        if (time === void 0) { time = 0; }
        var itemData = this.toData(item);
        return this.encodeInvoke(QueueOfferCodec_1.QueueOfferCodec, itemData, time);
    };
    QueueProxy.prototype.peek = function () {
        return this.encodeInvoke(QueuePeekCodec_1.QueuePeekCodec);
    };
    QueueProxy.prototype.poll = function (time) {
        if (time === void 0) { time = 0; }
        return this.encodeInvoke(QueuePollCodec_1.QueuePollCodec, time);
    };
    QueueProxy.prototype.put = function (item) {
        var itemData = this.toData(item);
        return this.encodeInvoke(QueuePutCodec_1.QueuePutCodec, itemData);
    };
    QueueProxy.prototype.remainingCapacity = function () {
        return this.encodeInvoke(QueueRemainingCapacityCodec_1.QueueRemainingCapacityCodec);
    };
    QueueProxy.prototype.remove = function (item) {
        var itemData = this.toData(item);
        return this.encodeInvoke(QueueRemoveCodec_1.QueueRemoveCodec, itemData);
    };
    QueueProxy.prototype.removeAll = function (items) {
        var toData = this.toData.bind(this);
        var rawItems = items.map(toData);
        return this.encodeInvoke(QueueCompareAndRemoveAllCodec_1.QueueCompareAndRemoveAllCodec, rawItems);
    };
    QueueProxy.prototype.removeItemListener = function (registrationId) {
        return this.client.getListenerService().deregisterListener(registrationId);
    };
    QueueProxy.prototype.retainAll = function (items) {
        var toData = this.toData.bind(this);
        var rawItems = items.map(toData);
        return this.encodeInvoke(QueueCompareAndRetainAllCodec_1.QueueCompareAndRetainAllCodec, rawItems);
    };
    QueueProxy.prototype.size = function () {
        return this.encodeInvoke(QueueSizeCodec_1.QueueSizeCodec);
    };
    QueueProxy.prototype.take = function () {
        return this.encodeInvoke(QueueTakeCodec_1.QueueTakeCodec);
    };
    QueueProxy.prototype.toArray = function () {
        var arr = [];
        var toObject = this.toObject.bind(this);
        return this.encodeInvoke(QueueIteratorCodec_1.QueueIteratorCodec).then(function (dataArray) {
            dataArray.forEach(function (data) {
                arr.push(toObject(data));
            });
            return arr;
        });
    };
    QueueProxy.prototype.createEntryListener = function (name, includeValue) {
        return {
            encodeAddRequest: function (localOnly) {
                return QueueAddListenerCodec_1.QueueAddListenerCodec.encodeRequest(name, includeValue, localOnly);
            },
            decodeAddResponse: function (msg) {
                return QueueAddListenerCodec_1.QueueAddListenerCodec.decodeResponse(msg).response;
            },
            encodeRemoveRequest: function (listenerId) {
                return QueueRemoveListenerCodec_1.QueueRemoveListenerCodec.encodeRequest(name, listenerId);
            },
        };
    };
    return QueueProxy;
}(PartitionSpecificProxy_1.PartitionSpecificProxy));
exports.QueueProxy = QueueProxy;
//# sourceMappingURL=QueueProxy.js.map