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
var EntryView_1 = require("../core/EntryView");
var EntryViewCodec = /** @class */ (function () {
    function EntryViewCodec() {
    }
    EntryViewCodec.encode = function (clientMessage, entryView, toData) {
        if (toData === void 0) { toData = null; }
        clientMessage.appendData(toData(entryView.key));
        clientMessage.appendData(toData(entryView.value));
        clientMessage.appendLong(entryView.cost);
        clientMessage.appendLong(entryView.creationTime);
        clientMessage.appendLong(entryView.expirationTime);
        clientMessage.appendLong(entryView.hits);
        clientMessage.appendLong(entryView.lastAccessTime);
        clientMessage.appendLong(entryView.lastStoreTime);
        clientMessage.appendLong(entryView.lastUpdateTime);
        clientMessage.appendLong(entryView.version);
        clientMessage.appendLong(entryView.evictionCriteriaNumber);
        clientMessage.appendLong(entryView.ttl);
    };
    EntryViewCodec.decode = function (clientMessage, toObject) {
        if (toObject === void 0) { toObject = null; }
        var entry = new EntryView_1.EntryView();
        entry.key = toObject(clientMessage.readData());
        entry.value = toObject(clientMessage.readData());
        entry.cost = clientMessage.readLong();
        entry.creationTime = clientMessage.readLong();
        entry.expirationTime = clientMessage.readLong();
        entry.hits = clientMessage.readLong();
        entry.lastAccessTime = clientMessage.readLong();
        entry.lastStoreTime = clientMessage.readLong();
        entry.lastUpdateTime = clientMessage.readLong();
        entry.version = clientMessage.readLong();
        entry.evictionCriteriaNumber = clientMessage.readLong();
        entry.ttl = clientMessage.readLong();
        return entry;
    };
    return EntryViewCodec;
}());
exports.EntryViewCodec = EntryViewCodec;
