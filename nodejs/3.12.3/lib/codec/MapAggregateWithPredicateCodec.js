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
var MapMessageType_1 = require("./MapMessageType");
var REQUEST_TYPE = MapMessageType_1.MapMessageType.MAP_AGGREGATEWITHPREDICATE;
var RESPONSE_TYPE = 105;
var RETRYABLE = true;
var MapAggregateWithPredicateCodec = /** @class */ (function () {
    function MapAggregateWithPredicateCodec() {
    }
    MapAggregateWithPredicateCodec.calculateSize = function (name, aggregator, predicate) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil_1.BitsUtil.calculateSizeData(aggregator);
        dataSize += BitsUtil_1.BitsUtil.calculateSizeData(predicate);
        return dataSize;
    };
    MapAggregateWithPredicateCodec.encodeRequest = function (name, aggregator, predicate) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, aggregator, predicate));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendData(aggregator);
        clientMessage.appendData(predicate);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    MapAggregateWithPredicateCodec.decodeResponse = function (clientMessage, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        // Decode response from client message
        var parameters = {
            'response': null
        };
        if (clientMessage.isComplete()) {
            return parameters;
        }
        if (clientMessage.readBoolean() !== true) {
            parameters['response'] = toObjectFunction(clientMessage.readData());
        }
        return parameters;
    };
    return MapAggregateWithPredicateCodec;
}());
exports.MapAggregateWithPredicateCodec = MapAggregateWithPredicateCodec;
//# sourceMappingURL=MapAggregateWithPredicateCodec.js.map