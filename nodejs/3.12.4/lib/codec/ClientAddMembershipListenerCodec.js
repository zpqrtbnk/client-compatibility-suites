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
var MemberCodec_1 = require("./MemberCodec");
var ClientMessageType_1 = require("./ClientMessageType");
var REQUEST_TYPE = ClientMessageType_1.ClientMessageType.CLIENT_ADDMEMBERSHIPLISTENER;
var RESPONSE_TYPE = 104;
var RETRYABLE = false;
var ClientAddMembershipListenerCodec = /** @class */ (function () {
    function ClientAddMembershipListenerCodec() {
    }
    ClientAddMembershipListenerCodec.calculateSize = function (localOnly) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.BOOLEAN_SIZE_IN_BYTES;
        return dataSize;
    };
    ClientAddMembershipListenerCodec.encodeRequest = function (localOnly) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(localOnly));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendBoolean(localOnly);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    ClientAddMembershipListenerCodec.decodeResponse = function (clientMessage, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        // Decode response from client message
        var parameters = {
            'response': null
        };
        parameters['response'] = clientMessage.readString();
        return parameters;
    };
    ClientAddMembershipListenerCodec.handle = function (clientMessage, handleEventMember, handleEventMemberlist, handleEventMemberattributechange, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        var messageType = clientMessage.getMessageType();
        if (messageType === BitsUtil_1.BitsUtil.EVENT_MEMBER && handleEventMember !== null) {
            var messageFinished = false;
            var member = undefined;
            if (!messageFinished) {
                member = MemberCodec_1.MemberCodec.decode(clientMessage, toObjectFunction);
            }
            var eventType = undefined;
            if (!messageFinished) {
                eventType = clientMessage.readInt32();
            }
            handleEventMember(member, eventType);
        }
        if (messageType === BitsUtil_1.BitsUtil.EVENT_MEMBERLIST && handleEventMemberlist !== null) {
            var messageFinished = false;
            var members = undefined;
            if (!messageFinished) {
                var membersSize = clientMessage.readInt32();
                members = [];
                for (var membersIndex = 0; membersIndex < membersSize; membersIndex++) {
                    var membersItem;
                    membersItem = MemberCodec_1.MemberCodec.decode(clientMessage, toObjectFunction);
                    members.push(membersItem);
                }
            }
            handleEventMemberlist(members);
        }
        if (messageType === BitsUtil_1.BitsUtil.EVENT_MEMBERATTRIBUTECHANGE && handleEventMemberattributechange !== null) {
            var messageFinished = false;
            var uuid = undefined;
            if (!messageFinished) {
                uuid = clientMessage.readString();
            }
            var key = undefined;
            if (!messageFinished) {
                key = clientMessage.readString();
            }
            var operationType = undefined;
            if (!messageFinished) {
                operationType = clientMessage.readInt32();
            }
            var value = undefined;
            if (!messageFinished) {
                if (clientMessage.readBoolean() !== true) {
                    value = clientMessage.readString();
                }
            }
            handleEventMemberattributechange(uuid, key, operationType, value);
        }
    };
    return ClientAddMembershipListenerCodec;
}());
exports.ClientAddMembershipListenerCodec = ClientAddMembershipListenerCodec;
