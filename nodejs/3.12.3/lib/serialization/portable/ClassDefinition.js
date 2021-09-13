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
var assert_1 = require("assert");
var ClassDefinition = /** @class */ (function () {
    function ClassDefinition(factoryId, classId, version) {
        this.fields = {};
        this.factoryId = factoryId;
        this.classId = classId;
        this.version = version;
    }
    ClassDefinition.prototype.addFieldDefinition = function (definition) {
        this.fields[definition.getName()] = definition;
    };
    ClassDefinition.prototype.getFieldCount = function () {
        return Object.keys(this.fields).length;
    };
    ClassDefinition.prototype.getFactoryId = function () {
        return this.factoryId;
    };
    ClassDefinition.prototype.getClassId = function () {
        return this.classId;
    };
    ClassDefinition.prototype.getVersion = function () {
        return this.version;
    };
    ClassDefinition.prototype.getFieldType = function (name) {
        var field = this.fields[name];
        if (field != null) {
            return field.getType();
        }
        else {
            throw new RangeError("Field " + field + " does not exist.");
        }
    };
    ClassDefinition.prototype.hasField = function (name) {
        return this.fields[name] != null;
    };
    ClassDefinition.prototype.getField = function (name) {
        var field = this.fields[name];
        return field || null;
    };
    ClassDefinition.prototype.getFieldById = function (index) {
        if (!Number.isInteger(index) || index < 0 || index >= this.getFieldCount()) {
            throw new RangeError("Index: " + index + ", fields count: " + this.getFieldCount() + ".");
        }
        for (var fieldName in this.fields) {
            if (this.fields[fieldName].getIndex() === index) {
                return this.fields[fieldName];
            }
        }
        throw new RangeError("There is no field with index " + index);
    };
    ClassDefinition.prototype.equals = function (o) {
        if (!(o instanceof ClassDefinition)) {
            return false;
        }
        if (o.factoryId !== this.factoryId || o.classId !== this.classId || o.version !== this.version) {
            return false;
        }
        try {
            assert_1.deepEqual(o.fields, this.fields);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    return ClassDefinition;
}());
exports.ClassDefinition = ClassDefinition;
var FieldDefinition = /** @class */ (function () {
    function FieldDefinition(index, fieldName, type, version, factoryId, classId) {
        if (factoryId === void 0) { factoryId = 0; }
        if (classId === void 0) { classId = 0; }
        this.index = index;
        this.fieldName = fieldName;
        this.type = type;
        this.factoryId = factoryId;
        this.classId = classId;
        this.version = version;
    }
    FieldDefinition.prototype.getType = function () {
        return this.type;
    };
    FieldDefinition.prototype.getName = function () {
        return this.fieldName;
    };
    FieldDefinition.prototype.getIndex = function () {
        return this.index;
    };
    FieldDefinition.prototype.getClassId = function () {
        return this.classId;
    };
    FieldDefinition.prototype.getFactoryId = function () {
        return this.factoryId;
    };
    FieldDefinition.prototype.getVersion = function () {
        return this.version;
    };
    return FieldDefinition;
}());
exports.FieldDefinition = FieldDefinition;
var FieldType;
(function (FieldType) {
    FieldType[FieldType["PORTABLE"] = 0] = "PORTABLE";
    FieldType[FieldType["BYTE"] = 1] = "BYTE";
    FieldType[FieldType["BOOLEAN"] = 2] = "BOOLEAN";
    FieldType[FieldType["CHAR"] = 3] = "CHAR";
    FieldType[FieldType["SHORT"] = 4] = "SHORT";
    FieldType[FieldType["INT"] = 5] = "INT";
    FieldType[FieldType["LONG"] = 6] = "LONG";
    FieldType[FieldType["FLOAT"] = 7] = "FLOAT";
    FieldType[FieldType["DOUBLE"] = 8] = "DOUBLE";
    FieldType[FieldType["UTF"] = 9] = "UTF";
    FieldType[FieldType["PORTABLE_ARRAY"] = 10] = "PORTABLE_ARRAY";
    FieldType[FieldType["BYTE_ARRAY"] = 11] = "BYTE_ARRAY";
    FieldType[FieldType["BOOLEAN_ARRAY"] = 12] = "BOOLEAN_ARRAY";
    FieldType[FieldType["CHAR_ARRAY"] = 13] = "CHAR_ARRAY";
    FieldType[FieldType["SHORT_ARRAY"] = 14] = "SHORT_ARRAY";
    FieldType[FieldType["INT_ARRAY"] = 15] = "INT_ARRAY";
    FieldType[FieldType["LONG_ARRAY"] = 16] = "LONG_ARRAY";
    FieldType[FieldType["FLOAT_ARRAY"] = 17] = "FLOAT_ARRAY";
    FieldType[FieldType["DOUBLE_ARRAY"] = 18] = "DOUBLE_ARRAY";
    FieldType[FieldType["UTF_ARRAY"] = 19] = "UTF_ARRAY";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
//# sourceMappingURL=ClassDefinition.js.map