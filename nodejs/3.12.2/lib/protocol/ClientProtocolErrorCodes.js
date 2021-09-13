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
var ClientProtocolErrorCodes = /** @class */ (function () {
    function ClientProtocolErrorCodes() {
    }
    ClientProtocolErrorCodes.UNDEFINED = 0;
    ClientProtocolErrorCodes.ARRAY_INDEX_OUT_OF_BOUNDS = 1;
    ClientProtocolErrorCodes.ARRAY_STORE = 2;
    ClientProtocolErrorCodes.AUTHENTICATION = 3;
    ClientProtocolErrorCodes.CACHE = 4;
    ClientProtocolErrorCodes.CACHE_LOADER = 5;
    ClientProtocolErrorCodes.CACHE_NOT_EXISTS = 6;
    ClientProtocolErrorCodes.CACHE_WRITER = 7;
    ClientProtocolErrorCodes.CALLER_NOT_MEMBER = 8;
    ClientProtocolErrorCodes.CANCELLATION = 9;
    ClientProtocolErrorCodes.CLASS_CAST = 10;
    ClientProtocolErrorCodes.CLASS_NOT_FOUND = 11;
    ClientProtocolErrorCodes.CONCURRENT_MODIFICATION = 12;
    ClientProtocolErrorCodes.CONFIG_MISMATCH = 13;
    ClientProtocolErrorCodes.CONFIGURATION = 14;
    ClientProtocolErrorCodes.DISTRIBUTED_OBJECT_DESTROYED = 15;
    ClientProtocolErrorCodes.DUPLICATE_INSTANCE_NAME = 16;
    ClientProtocolErrorCodes.EOF = 17;
    ClientProtocolErrorCodes.ENTRY_PROCESSOR = 18;
    ClientProtocolErrorCodes.EXECUTION = 19;
    ClientProtocolErrorCodes.HAZELCAST = 20;
    ClientProtocolErrorCodes.HAZELCAST_INSTANCE_NOT_ACTIVE = 21;
    ClientProtocolErrorCodes.HAZELCAST_OVERLOAD = 22;
    ClientProtocolErrorCodes.HAZELCAST_SERIALIZATION = 23;
    ClientProtocolErrorCodes.IO = 24;
    ClientProtocolErrorCodes.ILLEGAL_ARGUMENT = 25;
    ClientProtocolErrorCodes.ILLEGAL_ACCESS_EXCEPTION = 26;
    ClientProtocolErrorCodes.ILLEGAL_ACCESS_ERROR = 27;
    ClientProtocolErrorCodes.ILLEGAL_MONITOR_STATE = 28;
    ClientProtocolErrorCodes.ILLEGAL_STATE = 29;
    ClientProtocolErrorCodes.ILLEGAL_THREAD_STATE = 30;
    ClientProtocolErrorCodes.INDEX_OUT_OF_BOUNDS = 31;
    ClientProtocolErrorCodes.INTERRUPTED = 32;
    ClientProtocolErrorCodes.INVALID_ADDRESS = 33;
    ClientProtocolErrorCodes.INVALID_CONFIGURATION = 34;
    ClientProtocolErrorCodes.MEMBER_LEFT = 35;
    ClientProtocolErrorCodes.NEGATIVE_ARRAY_SIZE = 36;
    ClientProtocolErrorCodes.NO_SUCH_ELEMENT = 37;
    ClientProtocolErrorCodes.NOT_SERIALIZABLE = 38;
    ClientProtocolErrorCodes.NULL_POINTER = 39;
    ClientProtocolErrorCodes.OPERATION_TIMEOUT = 40;
    ClientProtocolErrorCodes.PARTITION_MIGRATING = 41;
    ClientProtocolErrorCodes.QUERY = 42;
    ClientProtocolErrorCodes.QUERY_RESULT_SIZE_EXCEEDED = 43;
    ClientProtocolErrorCodes.QUORUM = 44;
    ClientProtocolErrorCodes.REACHED_MAX_SIZE = 45;
    ClientProtocolErrorCodes.REJECTED_EXECUTION = 46;
    ClientProtocolErrorCodes.REMOTE_MAP_REDUCE = 47;
    ClientProtocolErrorCodes.RESPONSE_ALREADY_SENT = 48;
    ClientProtocolErrorCodes.RETRYABLE_HAZELCAST = 49;
    ClientProtocolErrorCodes.RETRYABLE_IO = 50;
    ClientProtocolErrorCodes.RUNTIME = 51;
    ClientProtocolErrorCodes.SECURITY = 52;
    ClientProtocolErrorCodes.SOCKET = 53;
    ClientProtocolErrorCodes.STALE_SEQUENCE = 54;
    ClientProtocolErrorCodes.TARGET_DISCONNECTED = 55;
    ClientProtocolErrorCodes.TARGET_NOT_MEMBER = 56;
    ClientProtocolErrorCodes.TIMEOUT = 57;
    ClientProtocolErrorCodes.TOPIC_OVERLOAD = 58;
    ClientProtocolErrorCodes.TOPOLOGY_CHANGED = 59;
    ClientProtocolErrorCodes.TRANSACTION = 60;
    ClientProtocolErrorCodes.TRANSACTION_NOT_ACTIVE = 61;
    ClientProtocolErrorCodes.TRANSACTION_TIMED_OUT = 62;
    ClientProtocolErrorCodes.URI_SYNTAX = 63;
    ClientProtocolErrorCodes.UTF_DATA_FORMAT = 64;
    ClientProtocolErrorCodes.UNSUPPORTED_OPERATION = 65;
    ClientProtocolErrorCodes.WRONG_TARGET = 66;
    ClientProtocolErrorCodes.XA = 67;
    ClientProtocolErrorCodes.ACCESS_CONTROL = 68;
    ClientProtocolErrorCodes.LOGIN = 69;
    ClientProtocolErrorCodes.UNSUPPORTED_CALLBACK = 70;
    ClientProtocolErrorCodes.NO_DATA_MEMBER = 71;
    ClientProtocolErrorCodes.REPLICATED_MAP_CANT_BE_CREATED = 72;
    ClientProtocolErrorCodes.MAX_MESSAGE_SIZE_EXCEEDED = 73;
    ClientProtocolErrorCodes.WAN_REPLICATION_QUEUE_FULL = 74;
    ClientProtocolErrorCodes.ASSERTION_ERROR = 75;
    ClientProtocolErrorCodes.OUT_OF_MEMORY_ERROR = 76;
    ClientProtocolErrorCodes.STACK_OVERFLOW_ERROR = 77;
    ClientProtocolErrorCodes.NATIVE_OUT_OF_MEMORY_ERROR = 78;
    ClientProtocolErrorCodes.SERVICE_NOT_FOUND = 79;
    ClientProtocolErrorCodes.STALE_TASK_ID = 80;
    ClientProtocolErrorCodes.DUPLICATE_TASK = 81;
    ClientProtocolErrorCodes.STALE_TASK = 82;
    ClientProtocolErrorCodes.LOCAL_MEMBER_RESET = 83;
    ClientProtocolErrorCodes.INDETERMINATE_OPERATION_STATE = 84;
    ClientProtocolErrorCodes.FLAKE_ID_NODE_ID_OUT_OF_RANGE_EXCEPTION = 85;
    ClientProtocolErrorCodes.TARGET_NOT_REPLICA_EXCEPTION = 86;
    ClientProtocolErrorCodes.MUTATION_DISALLOWED_EXCEPTION = 87;
    ClientProtocolErrorCodes.CONSISTENCY_LOST_EXCEPTION = 88;
    return ClientProtocolErrorCodes;
}());
exports.ClientProtocolErrorCodes = ClientProtocolErrorCodes;
//# sourceMappingURL=ClientProtocolErrorCodes.js.map