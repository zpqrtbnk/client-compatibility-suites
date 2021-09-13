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
var DefaultLogger_1 = require("./DefaultLogger");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["OFF"] = -1] = "OFF";
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
    LogLevel[LogLevel["TRACE"] = 4] = "TRACE";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var LoggingService = /** @class */ (function () {
    function LoggingService(customLogger, logLevel) {
        if (customLogger == null) {
            this.logger = new DefaultLogger_1.DefaultLogger(logLevel);
        }
        else if (this.isLogger(customLogger)) {
            this.logger = customLogger;
        }
        else {
            throw new RangeError('Logger should implement ILogger functions!');
        }
    }
    LoggingService.prototype.isLogger = function (loggingProperty) {
        loggingProperty = loggingProperty;
        return loggingProperty.log !== undefined && loggingProperty.error !== undefined && loggingProperty.warn !== undefined &&
            loggingProperty.info !== undefined && loggingProperty.debug !== undefined && loggingProperty.trace !== undefined;
    };
    LoggingService.prototype.getLogger = function () {
        return this.logger;
    };
    return LoggingService;
}());
exports.LoggingService = LoggingService;
