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
var UUIDCodec_1 = require("./UUIDCodec");
var MapMessageType_1 = require("./MapMessageType");
var REQUEST_TYPE = MapMessageType_1.MapMessageType.MAP_ADDNEARCACHEINVALIDATIONLISTENER;
var RESPONSE_TYPE = 104;
var RETRYABLE = false;
var MapAddNearCacheInvalidationListenerCodec = /** @class */ (function () {
    function MapAddNearCacheInvalidationListenerCodec() {
    }
    MapAddNearCacheInvalidationListenerCodec.calculateSize = function (name, listenerFlags, localOnly) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil_1.BitsUtil.INT_SIZE_IN_BYTES;
        dataSize += BitsUtil_1.BitsUtil.BOOLEAN_SIZE_IN_BYTES;
        return dataSize;
    };
    MapAddNearCacheInvalidationListenerCodec.encodeRequest = function (name, listenerFlags, localOnly) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, listenerFlags, localOnly));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendInt32(listenerFlags);
        clientMessage.appendBoolean(localOnly);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    MapAddNearCacheInvalidationListenerCodec.decodeResponse = function (clientMessage, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        // Decode response from client message
        var parameters = {
            'response': null
        };
        if (clientMessage.isComplete()) {
            return parameters;
        }
        parameters['response'] = clientMessage.readString();
        return parameters;
    };
    MapAddNearCacheInvalidationListenerCodec.handle = function (clientMessage, handleEventImapinvalidation, handleEventImapbatchinvalidation, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        var messageType = clientMessage.getMessageType();
        if (messageType === BitsUtil_1.BitsUtil.EVENT_IMAPINVALIDATION && handleEventImapinvalidation !== null) {
            var messageFinished = false;
            var key = undefined;
            if (!messageFinished) {
                messageFinished = clientMessage.isComplete();
            }
            if (!messageFinished) {
                if (clientMessage.readBoolean() !== true) {
                    key = clientMessage.readData();
                }
            }
            var sourceUuid = undefined;
            if (!messageFinished) {
                sourceUuid = clientMessage.readString();
            }
            var partitionUuid = undefined;
            if (!messageFinished) {
                partitionUuid = UUIDCodec_1.UUIDCodec.decode(clientMessage, toObjectFunction);
            }
            var sequence = undefined;
            if (!messageFinished) {
                sequence = clientMessage.readLong();
            }
            handleEventImapinvalidation(key, sourceUuid, partitionUuid, sequence);
        }
        if (messageType === BitsUtil_1.BitsUtil.EVENT_IMAPBATCHINVALIDATION && handleEventImapbatchinvalidation !== null) {
            var messageFinished = false;
            var keys = undefined;
            if (!messageFinished) {
                messageFinished = clientMessage.isComplete();
            }
            if (!messageFinished) {
                var keysSize = clientMessage.readInt32();
                keys = [];
                for (var keysIndex = 0; keysIndex < keysSize; keysIndex++) {
                    var keysItem;
                    keysItem = clientMessage.readData();
                    keys.push(keysItem);
                }
            }
            var sourceUuids = undefined;
            if (!messageFinished) {
                var sourceUuidsSize = clientMessage.readInt32();
                sourceUuids = [];
                for (var sourceUuidsIndex = 0; sourceUuidsIndex < sourceUuidsSize; sourceUuidsIndex++) {
                    var sourceUuidsItem;
                    sourceUuidsItem = clientMessage.readString();
                    sourceUuids.push(sourceUuidsItem);
                }
            }
            var partitionUuids = undefined;
            if (!messageFinished) {
                var partitionUuidsSize = clientMessage.readInt32();
                partitionUuids = [];
                for (var partitionUuidsIndex = 0; partitionUuidsIndex < partitionUuidsSize; partitionUuidsIndex++) {
                    var partitionUuidsItem;
                    partitionUuidsItem = UUIDCodec_1.UUIDCodec.decode(clientMessage, toObjectFunction);
                    partitionUuids.push(partitionUuidsItem);
                }
            }
            var sequences = undefined;
            if (!messageFinished) {
                var sequencesSize = clientMessage.readInt32();
                sequences = [];
                for (var sequencesIndex = 0; sequencesIndex < sequencesSize; sequencesIndex++) {
                    var sequencesItem;
                    sequencesItem = clientMessage.readLong();
                    sequences.push(sequencesItem);
                }
            }
            handleEventImapbatchinvalidation(keys, sourceUuids, partitionUuids, sequences);
        }
    };
    return MapAddNearCacheInvalidationListenerCodec;
}());
exports.MapAddNearCacheInvalidationListenerCodec = MapAddNearCacheInvalidationListenerCodec;
//# sourceMappingURL=MapAddNearCacheInvalidationListenerCodec.js.map