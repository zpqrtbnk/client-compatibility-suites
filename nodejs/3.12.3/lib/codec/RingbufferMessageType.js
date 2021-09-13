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
var RingbufferMessageType = /** @class */ (function () {
    function RingbufferMessageType() {
    }
    RingbufferMessageType.RINGBUFFER_SIZE = 0x1901;
    RingbufferMessageType.RINGBUFFER_TAILSEQUENCE = 0x1902;
    RingbufferMessageType.RINGBUFFER_HEADSEQUENCE = 0x1903;
    RingbufferMessageType.RINGBUFFER_CAPACITY = 0x1904;
    RingbufferMessageType.RINGBUFFER_REMAININGCAPACITY = 0x1905;
    RingbufferMessageType.RINGBUFFER_ADD = 0x1906;
    RingbufferMessageType.RINGBUFFER_READONE = 0x1908;
    RingbufferMessageType.RINGBUFFER_ADDALL = 0x1909;
    RingbufferMessageType.RINGBUFFER_READMANY = 0x190a;
    return RingbufferMessageType;
}());
exports.RingbufferMessageType = RingbufferMessageType;
//# sourceMappingURL=RingbufferMessageType.js.map