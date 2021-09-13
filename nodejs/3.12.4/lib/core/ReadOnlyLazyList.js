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
var ReadOnlyLazyListIterator = /** @class */ (function () {
    function ReadOnlyLazyListIterator(list) {
        this.index = 0;
        this.list = list;
    }
    ReadOnlyLazyListIterator.prototype.next = function () {
        if (this.index < this.list.size()) {
            return { done: false, value: this.list.get(this.index++) };
        }
        else {
            return { done: true, value: undefined };
        }
    };
    return ReadOnlyLazyListIterator;
}());
var ReadOnlyLazyList = /** @class */ (function () {
    function ReadOnlyLazyList(array, serializationService) {
        this.internalArray = array;
        this.serializationService = serializationService;
    }
    ReadOnlyLazyList.prototype.get = function (index) {
        var dataOrObject = this.internalArray[index];
        if (dataOrObject == null) {
            return undefined;
        }
        if (this.serializationService.isData(dataOrObject)) {
            var obj = this.serializationService.toObject(dataOrObject);
            this.internalArray[index] = obj;
            return obj;
        }
        else {
            return dataOrObject;
        }
    };
    ReadOnlyLazyList.prototype.size = function () {
        return this.internalArray.length;
    };
    ReadOnlyLazyList.prototype.values = function () {
        return new ReadOnlyLazyListIterator(this);
    };
    ReadOnlyLazyList.prototype.slice = function (start, end) {
        return new ReadOnlyLazyList(this.internalArray.slice(start, end), this.serializationService);
    };
    ReadOnlyLazyList.prototype.toArray = function () {
        var arr = [];
        var iterator = this.values();
        for (var item = iterator.next(); !item.done; item = iterator.next()) {
            arr.push(item.value);
        }
        return arr;
    };
    ReadOnlyLazyList.prototype[Symbol.iterator] = function () {
        return this.values();
    };
    return ReadOnlyLazyList;
}());
exports.ReadOnlyLazyList = ReadOnlyLazyList;
