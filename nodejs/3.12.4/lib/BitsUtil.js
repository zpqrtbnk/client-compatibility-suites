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
/* tslint:disable:no-bitwise */
var safe_buffer_1 = require("safe-buffer");
var BitsUtil = /** @class */ (function () {
    function BitsUtil() {
    }
    BitsUtil.calculateSizeData = function (data) {
        return BitsUtil.INT_SIZE_IN_BYTES + data.totalSize();
    };
    BitsUtil.getStringSize = function (value, nullable) {
        if (nullable === void 0) { nullable = false; }
        // int32 for string length
        var size = 4;
        if (nullable) {
            size += 1;
        }
        size += value == null ? 0 : safe_buffer_1.Buffer.byteLength(value, 'utf8');
        return size;
    };
    BitsUtil.calculateSizeString = function (value) {
        return this.getStringSize(value);
    };
    BitsUtil.calculateSizeBuffer = function (value) {
        var size = 4;
        size += value.length;
        return size;
    };
    BitsUtil.calculateSizeAddress = function (value) {
        var size = 4;
        size += this.calculateSizeString(value.host);
        return size;
    };
    BitsUtil.writeUInt32 = function (buffer, pos, val, isBigEndian) {
        if (isBigEndian) {
            buffer.writeUInt32BE(val, pos);
        }
        else {
            buffer.writeUInt32LE(val, pos);
        }
    };
    BitsUtil.writeUInt16 = function (buffer, pos, val, isBigEndian) {
        if (isBigEndian) {
            buffer.writeUInt16BE(val, pos);
        }
        else {
            buffer.writeUInt16LE(val, pos);
        }
    };
    BitsUtil.writeUInt8 = function (buffer, pos, val) {
        buffer.writeUInt8(val, pos);
    };
    BitsUtil.writeInt32 = function (buffer, pos, val, isBigEndian) {
        if (isBigEndian) {
            buffer.writeInt32BE(val, pos);
        }
        else {
            buffer.writeInt32LE(val, pos);
        }
    };
    BitsUtil.writeInt16 = function (buffer, pos, val, isBigEndian) {
        if (isBigEndian) {
            buffer.writeInt16BE(val, pos);
        }
        else {
            buffer.writeInt16LE(val, pos);
        }
    };
    BitsUtil.writeInt8 = function (buffer, pos, val) {
        buffer.writeInt8(val, pos);
    };
    BitsUtil.writeFloat = function (buffer, pos, val, isBigEndian) {
        if (isBigEndian) {
            buffer.writeFloatBE(val, pos);
        }
        else {
            buffer.writeFloatLE(val, pos);
        }
    };
    BitsUtil.writeDouble = function (buffer, pos, val, isBigEndian) {
        if (isBigEndian) {
            buffer.writeDoubleBE(val, pos);
        }
        else {
            buffer.writeDoubleLE(val, pos);
        }
    };
    BitsUtil.readDouble = function (buffer, pos, isBigEndian) {
        if (isBigEndian) {
            return buffer.readDoubleBE(pos);
        }
        else {
            return buffer.readDoubleLE(pos);
        }
    };
    BitsUtil.readFloat = function (buffer, pos, isBigEndian) {
        if (isBigEndian) {
            return buffer.readFloatBE(pos);
        }
        else {
            return buffer.readFloatLE(pos);
        }
    };
    BitsUtil.readInt8 = function (buffer, pos) {
        return buffer.readInt8(pos);
    };
    BitsUtil.readInt16 = function (buffer, pos, isBigEndian) {
        if (isBigEndian) {
            return buffer.readInt16BE(pos);
        }
        else {
            return buffer.readInt16LE(pos);
        }
    };
    BitsUtil.readInt32 = function (buffer, pos, isBigEndian) {
        if (isBigEndian) {
            return buffer.readInt32BE(pos);
        }
        else {
            return buffer.readInt32LE(pos);
        }
    };
    BitsUtil.readUInt8 = function (buffer, pos) {
        return buffer.readUInt8(pos);
    };
    BitsUtil.readUInt16 = function (buffer, pos, isBigEndian) {
        if (isBigEndian) {
            return buffer.readUInt16BE(pos);
        }
        else {
            return buffer.readUInt16LE(pos);
        }
    };
    BitsUtil.readUInt32 = function (buffer, pos, isBigEndian) {
        if (isBigEndian) {
            return buffer.readUInt32BE(pos);
        }
        else {
            return buffer.readUInt32LE(pos);
        }
    };
    BitsUtil.EVENT_MEMBER = 200;
    BitsUtil.EVENT_MEMBERLIST = 201;
    BitsUtil.EVENT_MEMBERATTRIBUTECHANGE = 202;
    BitsUtil.EVENT_ENTRY = 203;
    BitsUtil.EVENT_ITEM = 204;
    BitsUtil.EVENT_TOPIC = 205;
    BitsUtil.EVENT_PARTITIONLOST = 206;
    BitsUtil.EVENT_DISTRIBUTEDOBJECT = 207;
    BitsUtil.EVENT_CACHEINVALIDATION = 208;
    BitsUtil.EVENT_MAPPARTITIONLOST = 209;
    BitsUtil.EVENT_CACHE = 210;
    BitsUtil.EVENT_CACHEBATCHINVALIDATION = 211;
    BitsUtil.EVENT_QUERYCACHESINGLE = 212;
    BitsUtil.EVENT_QUERYCACHEBATCH = 213;
    BitsUtil.EVENT_CACHEPARTITIONLOST = 214;
    BitsUtil.EVENT_IMAPINVALIDATION = 215;
    BitsUtil.EVENT_IMAPBATCHINVALIDATION = 216;
    BitsUtil.EVENT_PARTITIONS = 217;
    BitsUtil.BYTE_SIZE_IN_BYTES = 1;
    BitsUtil.BOOLEAN_SIZE_IN_BYTES = 1;
    BitsUtil.SHORT_SIZE_IN_BYTES = 2;
    BitsUtil.CHAR_SIZE_IN_BYTES = 2;
    BitsUtil.INT_SIZE_IN_BYTES = 4;
    BitsUtil.FLOAT_SIZE_IN_BYTES = 4;
    BitsUtil.LONG_SIZE_IN_BYTES = 8;
    BitsUtil.DOUBLE_SIZE_IN_BYTES = 8;
    BitsUtil.BIG_ENDIAN = 2;
    BitsUtil.LITTLE_ENDIAN = 1;
    BitsUtil.VERSION = 1;
    BitsUtil.BEGIN_FLAG = 0x80;
    BitsUtil.END_FLAG = 0x40;
    BitsUtil.BEGIN_END_FLAG = BitsUtil.BEGIN_FLAG | BitsUtil.END_FLAG;
    BitsUtil.LISTENER_FLAG = 0x01;
    BitsUtil.NULL_ARRAY_LENGTH = -1;
    BitsUtil.SIZE_OFFSET = 0;
    BitsUtil.FRAME_LENGTH_FIELD_OFFSET = 0;
    BitsUtil.VERSION_FIELD_OFFSET = BitsUtil.FRAME_LENGTH_FIELD_OFFSET + BitsUtil.INT_SIZE_IN_BYTES;
    BitsUtil.FLAGS_FIELD_OFFSET = BitsUtil.VERSION_FIELD_OFFSET + BitsUtil.BYTE_SIZE_IN_BYTES;
    BitsUtil.TYPE_FIELD_OFFSET = BitsUtil.FLAGS_FIELD_OFFSET + BitsUtil.BYTE_SIZE_IN_BYTES;
    BitsUtil.CORRELATION_ID_FIELD_OFFSET = BitsUtil.TYPE_FIELD_OFFSET + BitsUtil.SHORT_SIZE_IN_BYTES;
    BitsUtil.PARTITION_ID_FIELD_OFFSET = BitsUtil.CORRELATION_ID_FIELD_OFFSET + BitsUtil.LONG_SIZE_IN_BYTES;
    BitsUtil.DATA_OFFSET_FIELD_OFFSET = BitsUtil.PARTITION_ID_FIELD_OFFSET + BitsUtil.INT_SIZE_IN_BYTES;
    BitsUtil.HEADER_SIZE = BitsUtil.DATA_OFFSET_FIELD_OFFSET + BitsUtil.SHORT_SIZE_IN_BYTES;
    return BitsUtil;
}());
exports.BitsUtil = BitsUtil;
