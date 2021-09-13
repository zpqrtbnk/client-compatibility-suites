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
var SemaphoreAcquireCodec_1 = require("../codec/SemaphoreAcquireCodec");
var SemaphoreAvailablePermitsCodec_1 = require("../codec/SemaphoreAvailablePermitsCodec");
var SemaphoreDrainPermitsCodec_1 = require("../codec/SemaphoreDrainPermitsCodec");
var SemaphoreInitCodec_1 = require("../codec/SemaphoreInitCodec");
var SemaphoreReducePermitsCodec_1 = require("../codec/SemaphoreReducePermitsCodec");
var SemaphoreReleaseCodec_1 = require("../codec/SemaphoreReleaseCodec");
var SemaphoreTryAcquireCodec_1 = require("../codec/SemaphoreTryAcquireCodec");
var Util_1 = require("../Util");
var PartitionSpecificProxy_1 = require("./PartitionSpecificProxy");
var SemaphoreProxy = /** @class */ (function (_super) {
    __extends(SemaphoreProxy, _super);
    function SemaphoreProxy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SemaphoreProxy.prototype.init = function (permits) {
        Util_1.assertNotNegative(permits, 'Permits cannot be negative.');
        return this.encodeInvoke(SemaphoreInitCodec_1.SemaphoreInitCodec, permits);
    };
    SemaphoreProxy.prototype.acquire = function (permits) {
        if (permits === void 0) { permits = 1; }
        Util_1.assertNotNegative(permits, 'Permits cannot be negative.');
        return this.encodeInvoke(SemaphoreAcquireCodec_1.SemaphoreAcquireCodec, permits);
    };
    SemaphoreProxy.prototype.availablePermits = function () {
        return this.encodeInvoke(SemaphoreAvailablePermitsCodec_1.SemaphoreAvailablePermitsCodec);
    };
    SemaphoreProxy.prototype.drainPermits = function () {
        return this.encodeInvoke(SemaphoreDrainPermitsCodec_1.SemaphoreDrainPermitsCodec);
    };
    SemaphoreProxy.prototype.reducePermits = function (reduction) {
        Util_1.assertNotNegative(reduction, 'Reduction cannot be negative.');
        return this.encodeInvoke(SemaphoreReducePermitsCodec_1.SemaphoreReducePermitsCodec, reduction);
    };
    SemaphoreProxy.prototype.release = function (permits) {
        if (permits === void 0) { permits = 1; }
        Util_1.assertNotNegative(permits, 'Permits cannot be negative.');
        return this.encodeInvoke(SemaphoreReleaseCodec_1.SemaphoreReleaseCodec, permits);
    };
    SemaphoreProxy.prototype.tryAcquire = function (permits, timeout) {
        if (timeout === void 0) { timeout = 0; }
        Util_1.assertNotNegative(permits, 'Permits cannot be negative.');
        return this.encodeInvoke(SemaphoreTryAcquireCodec_1.SemaphoreTryAcquireCodec, permits, timeout);
    };
    return SemaphoreProxy;
}(PartitionSpecificProxy_1.PartitionSpecificProxy));
exports.SemaphoreProxy = SemaphoreProxy;
