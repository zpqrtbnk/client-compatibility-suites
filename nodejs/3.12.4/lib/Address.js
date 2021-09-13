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
var net = require("net");
var ClusterDataFactoryHelper_1 = require("./ClusterDataFactoryHelper");
var Address = /** @class */ (function () {
    function Address(host, port) {
        this.host = host;
        this.port = port;
        this.type = net.isIP(host);
        this.addrStr = this.toStringInternal();
    }
    Address.prototype.readData = function (input) {
        this.port = input.readInt();
        this.type = input.readByte();
        this.host = input.readUTF();
        this.addrStr = this.toStringInternal();
    };
    Address.prototype.writeData = function (output) {
        output.writeInt(this.port);
        output.writeByte(this.type);
        output.writeUTF(this.host);
    };
    Address.prototype.getFactoryId = function () {
        return ClusterDataFactoryHelper_1.ClusterDataFactoryHelper.FACTORY_ID;
    };
    Address.prototype.getClassId = function () {
        return ClusterDataFactoryHelper_1.ClusterDataFactoryHelper.ADDRESS_ID;
    };
    Address.prototype.equals = function (other) {
        if (other === this) {
            return true;
        }
        if (other == null) {
            return false;
        }
        if (other.host === this.host &&
            other.port === this.port &&
            other.type === this.type) {
            return true;
        }
        return false;
    };
    Address.prototype.toString = function () {
        return this.addrStr;
    };
    Address.prototype.toStringInternal = function () {
        return this.host + ':' + this.port;
    };
    return Address;
}());
module.exports = Address;
