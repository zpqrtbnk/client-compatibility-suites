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
var LoggingService_1 = require("./LoggingService");
var DefaultLogger = /** @class */ (function () {
    function DefaultLogger(level) {
        this.level = level;
    }
    DefaultLogger.prototype.log = function (level, objectName, message, furtherInfo) {
        if (level <= this.level) {
            console.log('[DefaultLogger] %s at %s: %s', LoggingService_1.LogLevel[level], objectName, message);
            if (furtherInfo != null) {
                console.log(furtherInfo);
            }
        }
    };
    DefaultLogger.prototype.error = function (objectName, message, furtherInfo) {
        this.log(LoggingService_1.LogLevel.ERROR, objectName, message, furtherInfo);
    };
    DefaultLogger.prototype.warn = function (objectName, message, furtherInfo) {
        this.log(LoggingService_1.LogLevel.WARN, objectName, message, furtherInfo);
    };
    DefaultLogger.prototype.info = function (objectName, message, furtherInfo) {
        this.log(LoggingService_1.LogLevel.INFO, objectName, message, furtherInfo);
    };
    DefaultLogger.prototype.debug = function (objectName, message, furtherInfo) {
        this.log(LoggingService_1.LogLevel.DEBUG, objectName, message, furtherInfo);
    };
    DefaultLogger.prototype.trace = function (objectName, message, furtherInfo) {
        this.log(LoggingService_1.LogLevel.TRACE, objectName, message, furtherInfo);
    };
    return DefaultLogger;
}());
exports.DefaultLogger = DefaultLogger;
//# sourceMappingURL=DefaultLogger.js.map