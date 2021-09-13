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
var RegistrationKey = /** @class */ (function () {
    function RegistrationKey(regId, codec, registerRequest, registerHandlerFunc) {
        this.userRegistrationId = regId;
        this.registerHandlerFunc = registerHandlerFunc;
        this.registerRequest = registerRequest;
        this.codec = codec;
    }
    RegistrationKey.prototype.getRegisterRequest = function () {
        return this.registerRequest;
    };
    RegistrationKey.prototype.setRegisterRequest = function (registerRequest) {
        this.registerRequest = registerRequest;
    };
    RegistrationKey.prototype.getCodec = function () {
        return this.codec;
    };
    RegistrationKey.prototype.setCodec = function (value) {
        this.codec = value;
    };
    RegistrationKey.prototype.getHandler = function () {
        return this.registerHandlerFunc;
    };
    RegistrationKey.prototype.setHandler = function (handler) {
        this.registerHandlerFunc = handler;
    };
    RegistrationKey.prototype.getUserRegistrationKey = function () {
        return this.userRegistrationId;
    };
    return RegistrationKey;
}());
exports.RegistrationKey = RegistrationKey;
//# sourceMappingURL=RegistrationKey.js.map