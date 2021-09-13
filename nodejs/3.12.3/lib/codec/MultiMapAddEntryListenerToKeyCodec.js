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
/* tslint:disable */
var ClientMessage = require("../ClientMessage");
var BitsUtil_1 = require("../BitsUtil");
var MultiMapMessageType_1 = require("./MultiMapMessageType");
var REQUEST_TYPE = MultiMapMessageType_1.MultiMapMessageType.MULTIMAP_ADDENTRYLISTENERTOKEY;
var RESPONSE_TYPE = 104;
var RETRYABLE = false;
var MultiMapAddEntryListenerToKeyCodec = /** @class */ (function () {
    function MultiMapAddEntryListenerToKeyCodec() {
    }
    MultiMapAddEntryListenerToKeyCodec.calculateSize = function (name, key, includeValue, localOnly) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil_1.BitsUtil.calculateSizeData(key);
        dataSize += BitsUtil_1.BitsUtil.BOOLEAN_SIZE_IN_BYTES;
        dataSize += BitsUtil_1.BitsUtil.BOOLEAN_SIZE_IN_BYTES;
        return dataSize;
    };
    MultiMapAddEntryListenerToKeyCodec.encodeRequest = function (name, key, includeValue, localOnly) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, key, includeValue, localOnly));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendData(key);
        clientMessage.appendBoolean(includeValue);
        clientMessage.appendBoolean(localOnly);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    MultiMapAddEntryListenerToKeyCodec.decodeResponse = function (clientMessage, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        // Decode response from client message
        var parameters = {
            'response': null
        };
        parameters['response'] = clientMessage.readString();
        return parameters;
    };
    MultiMapAddEntryListenerToKeyCodec.handle = function (clientMessage, handleEventEntry, toObjectFunction) {
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
    return MultiMapAddEntryListenerToKeyCodec;
}());
exports.MultiMapAddEntryListenerToKeyCodec = MultiMapAddEntryListenerToKeyCodec;
//# sourceMappingURL=MultiMapAddEntryListenerToKeyCodec.js.map