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
var AtomicLongMessageType = /** @class */ (function () {
    function AtomicLongMessageType() {
    }
    AtomicLongMessageType.ATOMICLONG_APPLY = 0x0a01;
    AtomicLongMessageType.ATOMICLONG_ALTER = 0x0a02;
    AtomicLongMessageType.ATOMICLONG_ALTERANDGET = 0x0a03;
    AtomicLongMessageType.ATOMICLONG_GETANDALTER = 0x0a04;
    AtomicLongMessageType.ATOMICLONG_ADDANDGET = 0x0a05;
    AtomicLongMessageType.ATOMICLONG_COMPAREANDSET = 0x0a06;
    AtomicLongMessageType.ATOMICLONG_DECREMENTANDGET = 0x0a07;
    AtomicLongMessageType.ATOMICLONG_GET = 0x0a08;
    AtomicLongMessageType.ATOMICLONG_GETANDADD = 0x0a09;
    AtomicLongMessageType.ATOMICLONG_GETANDSET = 0x0a0a;
    AtomicLongMessageType.ATOMICLONG_INCREMENTANDGET = 0x0a0b;
    AtomicLongMessageType.ATOMICLONG_GETANDINCREMENT = 0x0a0c;
    AtomicLongMessageType.ATOMICLONG_SET = 0x0a0d;
    return AtomicLongMessageType;
}());
exports.AtomicLongMessageType = AtomicLongMessageType;
//# sourceMappingURL=AtomicLongMessageType.js.map