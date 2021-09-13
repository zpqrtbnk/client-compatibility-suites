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
var HazelcastError_1 = require("../../HazelcastError");
var Message_1 = require("./Message");
var ReliableTopicListenerRunner = /** @class */ (function () {
    function ReliableTopicListenerRunner(listenerId, listener, ringbuffer, batchSize, serializationService, logger, proxy) {
        this.sequenceNumber = 0;
        this.cancelled = false;
        this.listenerId = listenerId;
        this.listener = listener;
        this.ringbuffer = ringbuffer;
        this.batchSize = batchSize;
        this.serializationService = serializationService;
        this.proxy = proxy;
        this.logger = logger;
    }
    ReliableTopicListenerRunner.prototype.next = function () {
        var _this = this;
        if (this.cancelled) {
            return;
        }
        this.ringbuffer.readMany(this.sequenceNumber, 1, this.batchSize).then(function (result) {
            if (!_this.cancelled) {
                for (var i = 0; i < result.size(); i++) {
                    var msg = new Message_1.Message();
                    var item = result.get(i);
                    msg.messageObject = _this.serializationService.toObject(item.payload);
                    msg.publisher = item.publisherAddress;
                    msg.publishingTime = item.publishTime;
                    setImmediate(_this.listener, msg);
                    _this.sequenceNumber++;
                }
                setImmediate(_this.next.bind(_this));
            }
        }).catch(function (e) {
            var message;
            if (e instanceof HazelcastError_1.StaleSequenceError) {
                _this.ringbuffer.headSequence().then(function (seq) {
                    var newSequence = seq.toNumber();
                    message = 'Topic "' + _this.proxy.getName() + '" ran into a stale sequence. ' +
                        ' Jumping from old sequence ' + _this.sequenceNumber + ' to new sequence ' + newSequence;
                    _this.logger.warn('ReliableTopicListenerRunner', message);
                    _this.sequenceNumber = newSequence;
                    setImmediate(_this.next.bind(_this));
                });
                return;
            }
            message = 'Listener of topic "' + _this.proxy.getName() + '" caught an exception, terminating listener. ' + e;
            _this.logger.warn('ReliableTopicListenerRunner', message);
            _this.proxy.removeMessageListener(_this.listenerId);
        });
    };
    ReliableTopicListenerRunner.prototype.cancel = function () {
        this.cancelled = true;
    };
    return ReliableTopicListenerRunner;
}());
exports.ReliableTopicListenerRunner = ReliableTopicListenerRunner;
//# sourceMappingURL=ReliableTopicListenerRunner.js.map