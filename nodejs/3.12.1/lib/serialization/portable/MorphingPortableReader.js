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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultPortableReader_1 = require("./DefaultPortableReader");
var ClassDefinition_1 = require("./ClassDefinition");
var Long = require("long");
var MorphingPortableReader = /** @class */ (function (_super) {
    __extends(MorphingPortableReader, _super);
    function MorphingPortableReader(portableSerializer, input, classDefinition) {
        return _super.call(this, portableSerializer, input, classDefinition) || this;
    }
    MorphingPortableReader.prototype.readInt = function (fieldName) {
        var fieldDef = this.classDefinition.getField(fieldName);
        if (fieldDef == null) {
            return undefined;
        }
        switch (fieldDef.getType()) {
            case ClassDefinition_1.FieldType.INT:
                return _super.prototype.readInt.call(this, fieldName);
            case ClassDefinition_1.FieldType.BYTE:
                return _super.prototype.readByte.call(this, fieldName);
            case ClassDefinition_1.FieldType.CHAR:
                return _super.prototype.readChar.call(this, fieldName).charCodeAt(0);
            case ClassDefinition_1.FieldType.SHORT:
                return _super.prototype.readShort.call(this, fieldName);
            default:
                throw this.createIncompatibleClassChangeError(fieldDef, ClassDefinition_1.FieldType.INT);
        }
    };
    MorphingPortableReader.prototype.readLong = function (fieldName) {
        var fieldDef = this.classDefinition.getField(fieldName);
        if (fieldDef == null) {
            return undefined;
        }
        switch (fieldDef.getType()) {
            case ClassDefinition_1.FieldType.LONG:
                return _super.prototype.readLong.call(this, fieldName);
            case ClassDefinition_1.FieldType.INT:
                return Long.fromNumber(_super.prototype.readInt.call(this, fieldName));
            case ClassDefinition_1.FieldType.BYTE:
                return Long.fromNumber(_super.prototype.readByte.call(this, fieldName));
            case ClassDefinition_1.FieldType.CHAR:
                return Long.fromNumber(_super.prototype.readChar.call(this, fieldName).charCodeAt(0));
            case ClassDefinition_1.FieldType.SHORT:
                return Long.fromNumber(_super.prototype.readShort.call(this, fieldName));
            default:
                throw this.createIncompatibleClassChangeError(fieldDef, ClassDefinition_1.FieldType.LONG);
        }
    };
    MorphingPortableReader.prototype.readDouble = function (fieldName) {
        var fieldDef = this.classDefinition.getField(fieldName);
        if (fieldDef == null) {
            return undefined;
        }
        switch (fieldDef.getType()) {
            case ClassDefinition_1.FieldType.DOUBLE:
                return _super.prototype.readDouble.call(this, fieldName);
            case ClassDefinition_1.FieldType.LONG:
                return _super.prototype.readLong.call(this, fieldName).toNumber();
            case ClassDefinition_1.FieldType.FLOAT:
                return _super.prototype.readFloat.call(this, fieldName);
            case ClassDefinition_1.FieldType.INT:
                return _super.prototype.readInt.call(this, fieldName);
            case ClassDefinition_1.FieldType.BYTE:
                return _super.prototype.readByte.call(this, fieldName);
            case ClassDefinition_1.FieldType.CHAR:
                return _super.prototype.readChar.call(this, fieldName).charCodeAt(0);
            case ClassDefinition_1.FieldType.SHORT:
                return _super.prototype.readShort.call(this, fieldName);
            default:
                throw this.createIncompatibleClassChangeError(fieldDef, ClassDefinition_1.FieldType.DOUBLE);
        }
    };
    MorphingPortableReader.prototype.readFloat = function (fieldName) {
        var fieldDef = this.classDefinition.getField(fieldName);
        if (fieldDef == null) {
            return undefined;
        }
        switch (fieldDef.getType()) {
            case ClassDefinition_1.FieldType.FLOAT:
                return _super.prototype.readFloat.call(this, fieldName);
            case ClassDefinition_1.FieldType.INT:
                return _super.prototype.readInt.call(this, fieldName);
            case ClassDefinition_1.FieldType.BYTE:
                return _super.prototype.readByte.call(this, fieldName);
            case ClassDefinition_1.FieldType.CHAR:
                return _super.prototype.readChar.call(this, fieldName).charCodeAt(0);
            case ClassDefinition_1.FieldType.SHORT:
                return _super.prototype.readShort.call(this, fieldName);
            default:
                throw this.createIncompatibleClassChangeError(fieldDef, ClassDefinition_1.FieldType.FLOAT);
        }
    };
    MorphingPortableReader.prototype.readShort = function (fieldName) {
        var fieldDef = this.classDefinition.getField(fieldName);
        if (fieldDef == null) {
            return undefined;
        }
        switch (fieldDef.getType()) {
            case ClassDefinition_1.FieldType.BYTE:
                return _super.prototype.readByte.call(this, fieldName);
            case ClassDefinition_1.FieldType.SHORT:
                return _super.prototype.readShort.call(this, fieldName);
            default:
                throw this.createIncompatibleClassChangeError(fieldDef, ClassDefinition_1.FieldType.SHORT);
        }
    };
    MorphingPortableReader.prototype.readPortableArray = function (fieldName) {
        return this.validateCompatibleAndCall(fieldName, ClassDefinition_1.FieldType.PORTABLE_ARRAY, _super.prototype.readPortableArray);
    };
    MorphingPortableReader.prototype.readUTFArray = function (fieldName) {
        return this.validateCompatibleAndCall(fieldName, ClassDefinition_1.FieldType.UTF_ARRAY, _super.prototype.readUTFArray);
    };
    MorphingPortableReader.prototype.readShortArray = function (fieldName) {
        return this.validateCompatibleAndCall(fieldName, ClassDefinition_1.FieldType.SHORT_ARRAY, _super.prototype.readShortArray);
    };
    MorphingPortableReader.prototype.readFloatArray = function (fieldName) {
        return this.validateCompatibleAndCall(fieldName, ClassDefinition_1.FieldType.FLOAT_ARRAY, _super.prototype.readFloatArray);
    };
    MorphingPortableReader.prototype.readDoubleArray = function (fieldName) {
        return this.validateCompatibleAndCall(fieldName, ClassDefinition_1.FieldType.DOUBLE_ARRAY, _super.prototype.readDoubleArray);
    };
    MorphingPortableReader.prototype.readLongArray = function (fieldName) {
        return this.validateCompatibleAndCall(fieldName, ClassDefinition_1.FieldType.LONG_ARRAY, _super.prototype.readLongArray);
    };
    MorphingPortableReader.prototype.readIntArray = function (fieldName) {
        return this.validateCompatibleAndCall(fieldName, ClassDefinition_1.FieldType.INT_ARRAY, _super.prototype.readIntArray);
    };
    MorphingPortableReader.prototype.readCharArray = function (fieldName) {
        return this.validateCompatibleAndCall(fieldName, ClassDefinition_1.FieldType.CHAR_ARRAY, _super.prototype.readCharArray);
    };
    MorphingPortableReader.prototype.readBooleanArray = function (fieldName) {
        return this.validateCompatibleAndCall(fieldName, ClassDefinition_1.FieldType.BOOLEAN_ARRAY, _super.prototype.readBooleanArray);
    };
    MorphingPortableReader.prototype.readByteArray = function (fieldName) {
        return this.validateCompatibleAndCall(fieldName, ClassDefinition_1.FieldType.BYTE_ARRAY, _super.prototype.readByteArray);
    };
    MorphingPortableReader.prototype.readChar = function (fieldName) {
        return this.validateCompatibleAndCall(fieldName, ClassDefinition_1.FieldType.CHAR, _super.prototype.readChar);
    };
    MorphingPortableReader.prototype.readByte = function (fieldName) {
        return this.validateCompatibleAndCall(fieldName, ClassDefinition_1.FieldType.BYTE, _super.prototype.readByte);
    };
    MorphingPortableReader.prototype.readBoolean = function (fieldName) {
        return this.validateCompatibleAndCall(fieldName, ClassDefinition_1.FieldType.BOOLEAN, _super.prototype.readBoolean);
    };
    MorphingPortableReader.prototype.readUTF = function (fieldName) {
        return this.validateCompatibleAndCall(fieldName, ClassDefinition_1.FieldType.UTF, _super.prototype.readUTF);
    };
    MorphingPortableReader.prototype.validateCompatibleAndCall = function (fieldName, expectedType, superFunc) {
        var fd = this.classDefinition.getField(fieldName);
        if (fd === null) {
            return undefined;
        }
        if (fd.getType() !== expectedType) {
            throw this.createIncompatibleClassChangeError(fd, expectedType);
        }
        return superFunc.call(this, fieldName);
    };
    MorphingPortableReader.prototype.createIncompatibleClassChangeError = function (fd, expectedType) {
        return new TypeError("Incompatible to read " + expectedType + " from " + fd.getType() + " while reading field : " + fd.getName());
    };
    return MorphingPortableReader;
}(DefaultPortableReader_1.DefaultPortableReader));
exports.MorphingPortableReader = MorphingPortableReader;
//# sourceMappingURL=MorphingPortableReader.js.map