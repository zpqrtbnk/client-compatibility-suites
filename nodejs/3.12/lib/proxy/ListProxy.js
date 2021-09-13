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
var ListAddAllCodec_1 = require("../codec/ListAddAllCodec");
var ListAddAllWithIndexCodec_1 = require("../codec/ListAddAllWithIndexCodec");
var ListAddCodec_1 = require("../codec/ListAddCodec");
var ListAddListenerCodec_1 = require("../codec/ListAddListenerCodec");
var ListAddWithIndexCodec_1 = require("../codec/ListAddWithIndexCodec");
var ListClearCodec_1 = require("../codec/ListClearCodec");
var ListCompareAndRemoveAllCodec_1 = require("../codec/ListCompareAndRemoveAllCodec");
var ListCompareAndRetainAllCodec_1 = require("../codec/ListCompareAndRetainAllCodec");
var ListContainsAllCodec_1 = require("../codec/ListContainsAllCodec");
var ListContainsCodec_1 = require("../codec/ListContainsCodec");
var ListGetAllCodec_1 = require("../codec/ListGetAllCodec");
var ListGetCodec_1 = require("../codec/ListGetCodec");
var ListIndexOfCodec_1 = require("../codec/ListIndexOfCodec");
var ListIsEmptyCodec_1 = require("../codec/ListIsEmptyCodec");
var ListLastIndexOfCodec_1 = require("../codec/ListLastIndexOfCodec");
var ListRemoveCodec_1 = require("../codec/ListRemoveCodec");
var ListRemoveListenerCodec_1 = require("../codec/ListRemoveListenerCodec");
var ListRemoveWithIndexCodec_1 = require("../codec/ListRemoveWithIndexCodec");
var ListSetCodec_1 = require("../codec/ListSetCodec");
var ListSizeCodec_1 = require("../codec/ListSizeCodec");
var ListSubCodec_1 = require("../codec/ListSubCodec");
var ItemListener_1 = require("../core/ItemListener");
var ReadOnlyLazyList_1 = require("../core/ReadOnlyLazyList");
var PartitionSpecificProxy_1 = require("./PartitionSpecificProxy");
var ListProxy = /** @class */ (function (_super) {
    __extends(ListProxy, _super);
    function ListProxy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListProxy.prototype.add = function (element) {
        return this.encodeInvoke(ListAddCodec_1.ListAddCodec, this.toData(element));
    };
    ListProxy.prototype.addAll = function (elements) {
        return this.encodeInvoke(ListAddAllCodec_1.ListAddAllCodec, this.serializeList(elements));
    };
    ListProxy.prototype.addAllAt = function (index, elements) {
        return this.encodeInvoke(ListAddAllWithIndexCodec_1.ListAddAllWithIndexCodec, index, this.serializeList(elements));
    };
    ListProxy.prototype.addAt = function (index, element) {
        return this.encodeInvoke(ListAddWithIndexCodec_1.ListAddWithIndexCodec, index, this.toData(element));
    };
    ListProxy.prototype.clear = function () {
        return this.encodeInvoke(ListClearCodec_1.ListClearCodec);
    };
    ListProxy.prototype.contains = function (entry) {
        return this.encodeInvoke(ListContainsCodec_1.ListContainsCodec, this.toData(entry));
    };
    ListProxy.prototype.containsAll = function (elements) {
        return this.encodeInvoke(ListContainsAllCodec_1.ListContainsAllCodec, this.serializeList(elements));
    };
    ListProxy.prototype.isEmpty = function () {
        return this.encodeInvoke(ListIsEmptyCodec_1.ListIsEmptyCodec);
    };
    ListProxy.prototype.remove = function (entry) {
        return this.encodeInvoke(ListRemoveCodec_1.ListRemoveCodec, this.toData(entry));
    };
    ListProxy.prototype.removeAll = function (elements) {
        return this.encodeInvoke(ListCompareAndRemoveAllCodec_1.ListCompareAndRemoveAllCodec, this.serializeList(elements));
    };
    ListProxy.prototype.retainAll = function (elements) {
        return this.encodeInvoke(ListCompareAndRetainAllCodec_1.ListCompareAndRetainAllCodec, this.serializeList(elements));
    };
    ListProxy.prototype.removeAt = function (index) {
        return this.encodeInvoke(ListRemoveWithIndexCodec_1.ListRemoveWithIndexCodec, index);
    };
    ListProxy.prototype.get = function (index) {
        return this.encodeInvoke(ListGetCodec_1.ListGetCodec, index);
    };
    ListProxy.prototype.set = function (index, element) {
        return this.encodeInvoke(ListSetCodec_1.ListSetCodec, index, this.toData(element));
    };
    ListProxy.prototype.indexOf = function (element) {
        return this.encodeInvoke(ListIndexOfCodec_1.ListIndexOfCodec, this.toData(element));
    };
    ListProxy.prototype.lastIndexOf = function (element) {
        return this.encodeInvoke(ListLastIndexOfCodec_1.ListLastIndexOfCodec, this.toData(element));
    };
    ListProxy.prototype.size = function () {
        return this.encodeInvoke(ListSizeCodec_1.ListSizeCodec);
    };
    ListProxy.prototype.subList = function (start, end) {
        var _this = this;
        return this.encodeInvoke(ListSubCodec_1.ListSubCodec, start, end).then(function (encoded) {
            return new ReadOnlyLazyList_1.ReadOnlyLazyList(encoded, _this.client.getSerializationService());
        });
    };
    ListProxy.prototype.toArray = function () {
        var _this = this;
        return this.encodeInvoke(ListGetAllCodec_1.ListGetAllCodec).then(function (elements) {
            return elements.map(function (element) {
                return _this.toObject(element);
            });
        });
    };
    ListProxy.prototype.addItemListener = function (listener, includeValue) {
        var _this = this;
        var listenerHandler = function (message) {
            ListAddListenerCodec_1.ListAddListenerCodec.handle(message, function (element, uuid, eventType) {
                var responseObject = element ? _this.toObject(element) : null;
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
        var codec = this.createItemListener(this.name, includeValue);
        return this.client.getListenerService().registerListener(codec, listenerHandler);
    };
    ListProxy.prototype.removeItemListener = function (registrationId) {
        return this.client.getListenerService().deregisterListener(registrationId);
    };
    ListProxy.prototype.serializeList = function (input) {
        var _this = this;
        return input.map(function (each) {
            return _this.toData(each);
        });
    };
    ListProxy.prototype.createItemListener = function (name, includeValue) {
        return {
            encodeAddRequest: function (localOnly) {
                return ListAddListenerCodec_1.ListAddListenerCodec.encodeRequest(name, includeValue, localOnly);
            },
            decodeAddResponse: function (msg) {
                return ListAddListenerCodec_1.ListAddListenerCodec.decodeResponse(msg).response;
            },
            encodeRemoveRequest: function (listenerId) {
                return ListRemoveListenerCodec_1.ListRemoveListenerCodec.encodeRequest(name, listenerId);
            },
        };
    };
    return ListProxy;
}(PartitionSpecificProxy_1.PartitionSpecificProxy));
exports.ListProxy = ListProxy;
//# sourceMappingURL=ListProxy.js.map