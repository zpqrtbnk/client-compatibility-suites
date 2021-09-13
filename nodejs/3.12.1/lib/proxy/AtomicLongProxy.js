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
var AtomicLongAddAndGetCodec_1 = require("../codec/AtomicLongAddAndGetCodec");
var AtomicLongCompareAndSetCodec_1 = require("../codec/AtomicLongCompareAndSetCodec");
var AtomicLongDecrementAndGetCodec_1 = require("../codec/AtomicLongDecrementAndGetCodec");
var AtomicLongGetAndAddCodec_1 = require("../codec/AtomicLongGetAndAddCodec");
var AtomicLongGetAndIncrementCodec_1 = require("../codec/AtomicLongGetAndIncrementCodec");
var AtomicLongGetAndSetCodec_1 = require("../codec/AtomicLongGetAndSetCodec");
var AtomicLongGetCodec_1 = require("../codec/AtomicLongGetCodec");
var AtomicLongIncrementAndGetCodec_1 = require("../codec/AtomicLongIncrementAndGetCodec");
var AtomicLongSetCodec_1 = require("../codec/AtomicLongSetCodec");
var PartitionSpecificProxy_1 = require("./PartitionSpecificProxy");
var AtomicLongProxy = /** @class */ (function (_super) {
    __extends(AtomicLongProxy, _super);
    function AtomicLongProxy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AtomicLongProxy.prototype.addAndGet = function (delta) {
        return this.encodeInvoke(AtomicLongAddAndGetCodec_1.AtomicLongAddAndGetCodec, delta);
    };
    AtomicLongProxy.prototype.compareAndSet = function (expect, update) {
        return this.encodeInvoke(AtomicLongCompareAndSetCodec_1.AtomicLongCompareAndSetCodec, expect, update);
    };
    AtomicLongProxy.prototype.decrementAndGet = function () {
        return this.encodeInvoke(AtomicLongDecrementAndGetCodec_1.AtomicLongDecrementAndGetCodec);
    };
    AtomicLongProxy.prototype.get = function () {
        return this.encodeInvoke(AtomicLongGetCodec_1.AtomicLongGetCodec);
    };
    AtomicLongProxy.prototype.getAndAdd = function (delta) {
        return this.encodeInvoke(AtomicLongGetAndAddCodec_1.AtomicLongGetAndAddCodec, delta);
    };
    AtomicLongProxy.prototype.getAndSet = function (newValue) {
        return this.encodeInvoke(AtomicLongGetAndSetCodec_1.AtomicLongGetAndSetCodec, newValue);
    };
    AtomicLongProxy.prototype.incrementAndGet = function () {
        return this.encodeInvoke(AtomicLongIncrementAndGetCodec_1.AtomicLongIncrementAndGetCodec);
    };
    AtomicLongProxy.prototype.getAndIncrement = function () {
        return this.encodeInvoke(AtomicLongGetAndIncrementCodec_1.AtomicLongGetAndIncrementCodec);
    };
    AtomicLongProxy.prototype.set = function (newValue) {
        return this.encodeInvoke(AtomicLongSetCodec_1.AtomicLongSetCodec, newValue);
    };
    return AtomicLongProxy;
}(PartitionSpecificProxy_1.PartitionSpecificProxy));
exports.AtomicLongProxy = AtomicLongProxy;
//# sourceMappingURL=AtomicLongProxy.js.map