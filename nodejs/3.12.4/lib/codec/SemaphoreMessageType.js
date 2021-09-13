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
var SemaphoreMessageType = /** @class */ (function () {
    function SemaphoreMessageType() {
    }
    SemaphoreMessageType.SEMAPHORE_INIT = 0x0d01;
    SemaphoreMessageType.SEMAPHORE_ACQUIRE = 0x0d02;
    SemaphoreMessageType.SEMAPHORE_AVAILABLEPERMITS = 0x0d03;
    SemaphoreMessageType.SEMAPHORE_DRAINPERMITS = 0x0d04;
    SemaphoreMessageType.SEMAPHORE_REDUCEPERMITS = 0x0d05;
    SemaphoreMessageType.SEMAPHORE_RELEASE = 0x0d06;
    SemaphoreMessageType.SEMAPHORE_TRYACQUIRE = 0x0d07;
    return SemaphoreMessageType;
}());
exports.SemaphoreMessageType = SemaphoreMessageType;
