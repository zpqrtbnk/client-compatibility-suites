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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseProxy_1 = require("./BaseProxy");
var PartitionSpecificProxy = /** @class */ (function (_super) {
    __extends(PartitionSpecificProxy, _super);
    function PartitionSpecificProxy(client, serviceName, name) {
        var _this = _super.call(this, client, serviceName, name) || this;
        _this.partitionId = _this.client.getPartitionService().getPartitionId(_this.getPartitionKey());
        return _this;
    }
    PartitionSpecificProxy.prototype.encodeInvoke = function (codec) {
        var codecArguments = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            codecArguments[_i - 1] = arguments[_i];
        }
        return this.encodeInvokeOnPartition.apply(this, [codec, this.partitionId].concat(codecArguments));
    };
    return PartitionSpecificProxy;
}(BaseProxy_1.BaseProxy));
exports.PartitionSpecificProxy = PartitionSpecificProxy;
//# sourceMappingURL=PartitionSpecificProxy.js.map