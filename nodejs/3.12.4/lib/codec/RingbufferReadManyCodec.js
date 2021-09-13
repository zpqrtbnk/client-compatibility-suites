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
var RingbufferMessageType_1 = require("./RingbufferMessageType");
var REQUEST_TYPE = RingbufferMessageType_1.RingbufferMessageType.RINGBUFFER_READMANY;
var RESPONSE_TYPE = 115;
var RETRYABLE = true;
var RingbufferReadManyCodec = /** @class */ (function () {
    function RingbufferReadManyCodec() {
    }
    RingbufferReadManyCodec.calculateSize = function (name, startSequence, minCount, maxCount, filter) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
        dataSize += BitsUtil_1.BitsUtil.INT_SIZE_IN_BYTES;
        dataSize += BitsUtil_1.BitsUtil.INT_SIZE_IN_BYTES;
        dataSize += BitsUtil_1.BitsUtil.BOOLEAN_SIZE_IN_BYTES;
        if (filter !== null) {
            dataSize += BitsUtil_1.BitsUtil.calculateSizeData(filter);
        }
        return dataSize;
    };
    RingbufferReadManyCodec.encodeRequest = function (name, startSequence, minCount, maxCount, filter) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, startSequence, minCount, maxCount, filter));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendLong(startSequence);
        clientMessage.appendInt32(minCount);
        clientMessage.appendInt32(maxCount);
        clientMessage.appendBoolean(filter === null);
        if (filter !== null) {
            clientMessage.appendData(filter);
        }
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    RingbufferReadManyCodec.decodeResponse = function (clientMessage, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        // Decode response from client message
        var parameters = {
            'readCount': null,
            'items': null,
            'itemSeqs': null
        };
        parameters['readCount'] = clientMessage.readInt32();
        var itemsSize = clientMessage.readInt32();
        var items = [];
        for (var itemsIndex = 0; itemsIndex < itemsSize; itemsIndex++) {
            var itemsItem;
            itemsItem = clientMessage.readData();
            items.push(itemsItem);
        }
        parameters['items'] = items;
        if (clientMessage.isComplete()) {
            return parameters;
        }
        if (clientMessage.readBoolean() !== true) {
            var itemSeqsSize = clientMessage.readInt32();
            var itemSeqs = [];
            for (var itemSeqsIndex = 0; itemSeqsIndex < itemSeqsSize; itemSeqsIndex++) {
                var itemSeqsItem;
                itemSeqsItem = clientMessage.readLong();
                itemSeqs.push(itemSeqsItem);
            }
            parameters['itemSeqs'] = itemSeqs;
        }
        parameters.itemSeqsExist = true;
        return parameters;
    };
    return RingbufferReadManyCodec;
}());
exports.RingbufferReadManyCodec = RingbufferReadManyCodec;
