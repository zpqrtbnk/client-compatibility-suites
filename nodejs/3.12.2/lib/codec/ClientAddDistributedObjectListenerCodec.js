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
var ClientMessageType_1 = require("./ClientMessageType");
var REQUEST_TYPE = ClientMessageType_1.ClientMessageType.CLIENT_ADDDISTRIBUTEDOBJECTLISTENER;
var RESPONSE_TYPE = 104;
var RETRYABLE = false;
var ClientAddDistributedObjectListenerCodec = /** @class */ (function () {
    function ClientAddDistributedObjectListenerCodec() {
    }
    ClientAddDistributedObjectListenerCodec.calculateSize = function (localOnly) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.BOOLEAN_SIZE_IN_BYTES;
        return dataSize;
    };
    ClientAddDistributedObjectListenerCodec.encodeRequest = function (localOnly) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(localOnly));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendBoolean(localOnly);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    ClientAddDistributedObjectListenerCodec.decodeResponse = function (clientMessage, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        // Decode response from client message
        var parameters = {
            'response': null
        };
        parameters['response'] = clientMessage.readString();
        return parameters;
    };
    ClientAddDistributedObjectListenerCodec.handle = function (clientMessage, handleEventDistributedobject, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        var messageType = clientMessage.getMessageType();
        if (messageType === BitsUtil_1.BitsUtil.EVENT_DISTRIBUTEDOBJECT && handleEventDistributedobject !== null) {
            var messageFinished = false;
            var name = undefined;
            if (!messageFinished) {
                name = clientMessage.readString();
            }
            var serviceName = undefined;
            if (!messageFinished) {
                serviceName = clientMessage.readString();
            }
            var eventType = undefined;
            if (!messageFinished) {
                eventType = clientMessage.readString();
            }
            handleEventDistributedobject(name, serviceName, eventType);
        }
    };
    return ClientAddDistributedObjectListenerCodec;
}());
exports.ClientAddDistributedObjectListenerCodec = ClientAddDistributedObjectListenerCodec;
//# sourceMappingURL=ClientAddDistributedObjectListenerCodec.js.map