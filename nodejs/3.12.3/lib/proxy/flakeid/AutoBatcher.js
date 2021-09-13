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
var events_1 = require("events");
var Util_1 = require("../../Util");
var Batch = /** @class */ (function () {
    function Batch(validityMillis, base, increment, batchSize) {
        this.nextIdLong = base;
        this.increment = increment;
        this.firstInvalidId = base.add(this.increment.multiply(batchSize));
        if (validityMillis > 0) {
            this.invalidSince = validityMillis + Date.now();
        }
        else {
            this.invalidSince = Number.MAX_SAFE_INTEGER;
        }
    }
    /**
     * @returns next id from the batch,
     *          undefined if ids are exhausted or not valid anymore
     */
    Batch.prototype.nextId = function () {
        if (this.invalidSince <= Date.now()) {
            return undefined;
        }
        if (this.firstInvalidId.equals(this.nextIdLong)) {
            return undefined;
        }
        var returnLong = this.nextIdLong;
        this.nextIdLong = this.nextIdLong.add(this.increment);
        return returnLong;
    };
    return Batch;
}());
exports.Batch = Batch;
var AutoBatcher = /** @class */ (function () {
    function AutoBatcher(supplier) {
        this.NEW_BATCH_AVAILABLE = 'newBatch';
        this.queue = [];
        this.requestInFlight = false;
        this.emitter = new events_1.EventEmitter();
        this.supplier = supplier;
        this.emitter.on(this.NEW_BATCH_AVAILABLE, this.processIdRequests.bind(this));
        this.emitter.on('error', this.rejectAll.bind(this));
    }
    AutoBatcher.prototype.processIdRequests = function () {
        var ind = 0;
        while (ind < this.queue.length) {
            var nextId = void 0;
            if (this.batch != null && (nextId = this.batch.nextId()) != null) {
                this.queue[ind].resolve(nextId);
                ind++;
            }
            else {
                this.assignNewBatch();
                break;
            }
        }
        this.queue.splice(0, ind);
    };
    AutoBatcher.prototype.nextId = function () {
        var deferred = Util_1.DeferredPromise();
        this.queue.push(deferred);
        this.processIdRequests();
        return deferred.promise;
    };
    AutoBatcher.prototype.assignNewBatch = function () {
        var _this = this;
        if (this.requestInFlight) {
            return;
        }
        this.requestInFlight = true;
        this.supplier().then(function (batch) {
            _this.requestInFlight = false;
            _this.batch = batch;
            _this.emitter.emit(_this.NEW_BATCH_AVAILABLE);
        }).catch(function (e) {
            _this.requestInFlight = false;
            _this.emitter.emit('error', e);
        });
    };
    AutoBatcher.prototype.rejectAll = function (e) {
        this.queue.forEach(function (deferred) {
            deferred.reject(e);
        });
        this.queue = [];
    };
    return AutoBatcher;
}());
exports.AutoBatcher = AutoBatcher;
//# sourceMappingURL=AutoBatcher.js.map