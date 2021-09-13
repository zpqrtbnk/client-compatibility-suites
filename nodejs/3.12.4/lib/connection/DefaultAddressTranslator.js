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
var Promise = require("bluebird");
/**
 * Default Address Translator is a no-op. It always returns the given address.
 */
var DefaultAddressTranslator = /** @class */ (function () {
    function DefaultAddressTranslator() {
    }
    DefaultAddressTranslator.prototype.refresh = function () {
        return Promise.resolve();
    };
    DefaultAddressTranslator.prototype.translate = function (address) {
        return Promise.resolve(address);
    };
    return DefaultAddressTranslator;
}());
exports.DefaultAddressTranslator = DefaultAddressTranslator;
