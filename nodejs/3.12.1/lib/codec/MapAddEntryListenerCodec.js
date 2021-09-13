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
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var ClientMessage = require("../ClientMessage");
var BitsUtil_1 = require("../BitsUtil");
var MapMessageType_1 = require("./MapMessageType");
var REQUEST_TYPE = MapMessageType_1.MapMessageType.MAP_ADDENTRYLISTENER;
var RESPONSE_TYPE = 104;
var RETRYABLE = false;
var MapAddEntryListenerCodec = /** @class */ (function () {
    function MapAddEntryListenerCodec() {
    }
    MapAddEntryListenerCodec.calculateSize = function (name, includeValue, listenerFlags, localOnly) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil_1.BitsUtil.BOOLEAN_SIZE_IN_BYTES;
        dataSize += BitsUtil_1.BitsUtil.INT_SIZE_IN_BYTES;
        dataSize += BitsUtil_1.BitsUtil.BOOLEAN_SIZE_IN_BYTES;
        return dataSize;
    };
    MapAddEntryListenerCodec.encodeRequest = function (name, includeValue, listenerFlags, localOnly) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, includeValue, listenerFlags, localOnly));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendBoolean(includeValue);
        clientMessage.appendInt32(listenerFlags);
        clientMessage.appendBoolean(localOnly);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    MapAddEntryListenerCodec.decodeResponse = function (clientMessage, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        // Decode response from client message
        var parameters = {
            'response': null
        };
        parameters['response'] = clientMessage.readString();
        return parameters;
    };
    MapAddEntryListenerCodec.handle = function (clientMessage, handleEventEntry, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        var messageType = clientMessage.getMessageType();
        if (messageType === BitsUtil_1.BitsUtil.EVENT_ENTRY && handleEventEntry !== null) {
            var messageFinished = false;
            var key = undefined;
            if (!messageFinished) {
                if (clientMessage.readBoolean() !== true) {
                    key = clientMessage.readData();
                }
            }
            var value = undefined;
            if (!messageFinished) {
                if (clientMessage.readBoolean() !== true) {
                    value = clientMessage.readData();
                }
            }
            var oldValue = undefined;
            if (!messageFinished) {
                if (clientMessage.readBoolean() !== true) {
                    oldValue = clientMessage.readData();
                }
            }
            var mergingValue = undefined;
            if (!messageFinished) {
                if (clientMessage.readBoolean() !== true) {
                    mergingValue = clientMessage.readData();
                }
            }
            var eventType = undefined;
            if (!messageFinished) {
                eventType = clientMessage.readInt32();
            }
            var uuid = undefined;
            if (!messageFinished) {
                uuid = clientMessage.readString();
            }
            var numberOfAffectedEntries = undefined;
            if (!messageFinished) {
                numberOfAffectedEntries = clientMessage.readInt32();
            }
            handleEventEntry(key, value, oldValue, mergingValue, eventType, uuid, numberOfAffectedEntries);
        }
    };
    return MapAddEntryListenerCodec;
}());
exports.MapAddEntryListenerCodec = MapAddEntryListenerCodec;
//# sourceMappingURL=MapAddEntryListenerCodec.js.map