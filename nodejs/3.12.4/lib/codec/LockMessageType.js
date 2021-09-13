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
var LockMessageType = /** @class */ (function () {
    function LockMessageType() {
    }
    LockMessageType.LOCK_ISLOCKED = 0x0701;
    LockMessageType.LOCK_ISLOCKEDBYCURRENTTHREAD = 0x0702;
    LockMessageType.LOCK_GETLOCKCOUNT = 0x0703;
    LockMessageType.LOCK_GETREMAININGLEASETIME = 0x0704;
    LockMessageType.LOCK_LOCK = 0x0705;
    LockMessageType.LOCK_UNLOCK = 0x0706;
    LockMessageType.LOCK_FORCEUNLOCK = 0x0707;
    LockMessageType.LOCK_TRYLOCK = 0x0708;
    return LockMessageType;
}());
exports.LockMessageType = LockMessageType;
