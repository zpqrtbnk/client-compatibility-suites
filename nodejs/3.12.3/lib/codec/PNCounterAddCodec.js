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
var AddressCodec_1 = require("./AddressCodec");
var PNCounterMessageType_1 = require("./PNCounterMessageType");
var REQUEST_TYPE = PNCounterMessageType_1.PNCounterMessageType.PNCOUNTER_ADD;
var RESPONSE_TYPE = 127;
var RETRYABLE = false;
var PNCounterAddCodec = /** @class */ (function () {
    function PNCounterAddCodec() {
    }
    PNCounterAddCodec.calculateSize = function (name, delta, getBeforeUpdate, replicaTimestamps, targetReplica) {
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
        dataSize += BitsUtil_1.BitsUtil.BOOLEAN_SIZE_IN_BYTES;
        dataSize += BitsUtil_1.BitsUtil.INT_SIZE_IN_BYTES;
        replicaTimestamps.forEach(function (replicaTimestampsItem) {
            var key = replicaTimestampsItem[0];
            var val = replicaTimestampsItem[1];
            dataSize += BitsUtil_1.BitsUtil.calculateSizeString(key);
            dataSize += BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
        });
        dataSize += BitsUtil_1.BitsUtil.calculateSizeAddress(targetReplica);
        return dataSize;
    };
    PNCounterAddCodec.encodeRequest = function (name, delta, getBeforeUpdate, replicaTimestamps, targetReplica) {
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, delta, getBeforeUpdate, replicaTimestamps, targetReplica));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendLong(delta);
        clientMessage.appendBoolean(getBeforeUpdate);
        clientMessage.appendInt32(replicaTimestamps.length);
        replicaTimestamps.forEach(function (replicaTimestampsItem) {
            var key = replicaTimestampsItem[0];
            var val = replicaTimestampsItem[1];
            clientMessage.appendString(key);
            clientMessage.appendLong(val);
        });
        AddressCodec_1.AddressCodec.encode(clientMessage, targetReplica);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    PNCounterAddCodec.decodeResponse = function (clientMessage, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        var parameters = {
            'value': null,
            'replicaTimestamps': null,
            'replicaCount': null
        };
        if (clientMessage.isComplete()) {
            return parameters;
        }
        parameters['value'] = clientMessage.readLong();
        var replicaTimestampsSize = clientMessage.readInt32();
        var replicaTimestamps = [];
        for (var replicaTimestampsIndex = 0; replicaTimestampsIndex < replicaTimestampsSize; replicaTimestampsIndex++) {
            var replicaTimestampsItem;
            var replicaTimestampsItemKey;
            var replicaTimestampsItemVal;
            replicaTimestampsItemKey = clientMessage.readString();
            replicaTimestampsItemVal = clientMessage.readLong();
            replicaTimestampsItem = [replicaTimestampsItemKey, replicaTimestampsItemVal];
            replicaTimestamps.push(replicaTimestampsItem);
        }
        parameters['replicaTimestamps'] = replicaTimestamps;
        parameters['replicaCount'] = clientMessage.readInt32();
        return parameters;
    };
    return PNCounterAddCodec;
}());
exports.PNCounterAddCodec = PNCounterAddCodec;
//# sourceMappingURL=PNCounterAddCodec.js.map