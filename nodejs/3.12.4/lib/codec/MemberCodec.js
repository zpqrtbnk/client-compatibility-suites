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
var Member_1 = require("../core/Member");
var AddressCodec_1 = require("./AddressCodec");
var MemberCodec = /** @class */ (function () {
    function MemberCodec() {
    }
    MemberCodec.encode = function (clientMessage, member) {
        AddressCodec_1.AddressCodec.encode(clientMessage, member.address);
        clientMessage.appendString(member.uuid);
        clientMessage.appendBoolean(member.isLiteMember);
        var keys = Object.keys(member.attributes);
        clientMessage.appendInt32(keys.length);
        for (var key in keys) {
            clientMessage.appendString(key);
            clientMessage.appendString(member.attributes[key]);
        }
    };
    MemberCodec.decode = function (clientMessage, toObject) {
        var address = AddressCodec_1.AddressCodec.decode(clientMessage, toObject);
        var uuid = clientMessage.readString();
        var liteMember = clientMessage.readBoolean();
        var attributeSize = clientMessage.readInt32();
        var attributes = {};
        for (var i = 0; i < attributeSize; i++) {
            var key = clientMessage.readString();
            var val = clientMessage.readString();
            attributes[key] = val;
        }
        return new Member_1.Member(address, uuid, liteMember, attributes);
    };
    return MemberCodec;
}());
exports.MemberCodec = MemberCodec;
