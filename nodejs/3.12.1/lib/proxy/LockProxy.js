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
var PartitionSpecificProxy_1 = require("./PartitionSpecificProxy");
var LockForceUnlockCodec_1 = require("../codec/LockForceUnlockCodec");
var LockGetLockCountCodec_1 = require("../codec/LockGetLockCountCodec");
var LockGetRemainingLeaseTimeCodec_1 = require("../codec/LockGetRemainingLeaseTimeCodec");
var LockIsLockedByCurrentThreadCodec_1 = require("../codec/LockIsLockedByCurrentThreadCodec");
var LockIsLockedCodec_1 = require("../codec/LockIsLockedCodec");
var LockLockCodec_1 = require("../codec/LockLockCodec");
var LockTryLockCodec_1 = require("../codec/LockTryLockCodec");
var LockUnlockCodec_1 = require("../codec/LockUnlockCodec");
var LockProxy = /** @class */ (function (_super) {
    __extends(LockProxy, _super);
    function LockProxy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lockReferenceIdGenerator = _this.client.getLockReferenceIdGenerator();
        return _this;
    }
    LockProxy.prototype.lock = function (leaseMillis) {
        if (leaseMillis === void 0) { leaseMillis = -1; }
        return this.encodeInvoke(LockLockCodec_1.LockLockCodec, leaseMillis, 1, this.nextSequence());
    };
    LockProxy.prototype.tryLock = function (timeoutMillis, leaseMillis) {
        if (timeoutMillis === void 0) { timeoutMillis = 0; }
        if (leaseMillis === void 0) { leaseMillis = -1; }
        return this.encodeInvoke(LockTryLockCodec_1.LockTryLockCodec, 1, leaseMillis, timeoutMillis, this.nextSequence());
    };
    LockProxy.prototype.unlock = function () {
        return this.encodeInvoke(LockUnlockCodec_1.LockUnlockCodec, 1, this.nextSequence());
    };
    LockProxy.prototype.forceUnlock = function () {
        return this.encodeInvoke(LockForceUnlockCodec_1.LockForceUnlockCodec, this.nextSequence());
    };
    LockProxy.prototype.isLocked = function () {
        return this.encodeInvoke(LockIsLockedCodec_1.LockIsLockedCodec);
    };
    LockProxy.prototype.isLockedByThisClient = function () {
        return this.encodeInvoke(LockIsLockedByCurrentThreadCodec_1.LockIsLockedByCurrentThreadCodec, 1);
    };
    LockProxy.prototype.getLockCount = function () {
        return this.encodeInvoke(LockGetLockCountCodec_1.LockGetLockCountCodec);
    };
    LockProxy.prototype.getRemainingLeaseTime = function () {
        return this.encodeInvoke(LockGetRemainingLeaseTimeCodec_1.LockGetRemainingLeaseTimeCodec).then(function (long) {
            return long.toNumber();
        });
    };
    LockProxy.prototype.nextSequence = function () {
        return this.lockReferenceIdGenerator.getNextReferenceId();
    };
    return LockProxy;
}(PartitionSpecificProxy_1.PartitionSpecificProxy));
exports.LockProxy = LockProxy;
//# sourceMappingURL=LockProxy.js.map