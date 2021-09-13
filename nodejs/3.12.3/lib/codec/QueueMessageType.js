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
var QueueMessageType = /** @class */ (function () {
    function QueueMessageType() {
    }
    QueueMessageType.QUEUE_OFFER = 0x0301;
    QueueMessageType.QUEUE_PUT = 0x0302;
    QueueMessageType.QUEUE_SIZE = 0x0303;
    QueueMessageType.QUEUE_REMOVE = 0x0304;
    QueueMessageType.QUEUE_POLL = 0x0305;
    QueueMessageType.QUEUE_TAKE = 0x0306;
    QueueMessageType.QUEUE_PEEK = 0x0307;
    QueueMessageType.QUEUE_ITERATOR = 0x0308;
    QueueMessageType.QUEUE_DRAINTO = 0x0309;
    QueueMessageType.QUEUE_DRAINTOMAXSIZE = 0x030a;
    QueueMessageType.QUEUE_CONTAINS = 0x030b;
    QueueMessageType.QUEUE_CONTAINSALL = 0x030c;
    QueueMessageType.QUEUE_COMPAREANDREMOVEALL = 0x030d;
    QueueMessageType.QUEUE_COMPAREANDRETAINALL = 0x030e;
    QueueMessageType.QUEUE_CLEAR = 0x030f;
    QueueMessageType.QUEUE_ADDALL = 0x0310;
    QueueMessageType.QUEUE_ADDLISTENER = 0x0311;
    QueueMessageType.QUEUE_REMOVELISTENER = 0x0312;
    QueueMessageType.QUEUE_REMAININGCAPACITY = 0x0313;
    QueueMessageType.QUEUE_ISEMPTY = 0x0314;
    return QueueMessageType;
}());
exports.QueueMessageType = QueueMessageType;
//# sourceMappingURL=QueueMessageType.js.map