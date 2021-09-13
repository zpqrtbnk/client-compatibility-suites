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
/* tslint:disable:no-bitwise */
/*
 Client Message is the carrier framed data as defined below.
 Any request parameter, response or event data will be carried in the payload.
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 |R|                      Frame Length                           |
 +-------------+---------------+---------------------------------+
 |  Version    |B|E|  Flags    |               Type              |
 +-------------+---------------+---------------------------------+
 |                       CorrelationId                           |
 |                                                               |
 +---------------------------------------------------------------+
 |                        PartitionId                            |
 +-----------------------------+---------------------------------+
 |        Data Offset          |                                 |
 +-----------------------------+                                 |
 |                      Message Payload Data                    ...
 |                                                              ...
 */
var safe_buffer_1 = require("safe-buffer");
var Long = require("long");
var BitsUtil_1 = require("./BitsUtil");
var HeapData_1 = require("./serialization/HeapData");
var ClientMessage = /** @class */ (function () {
    function ClientMessage(buffer) {
        this.cursor = BitsUtil_1.BitsUtil.HEADER_SIZE;
        this.buffer = buffer;
    }
    ClientMessage.newClientMessage = function (payloadSize) {
        var totalSize = BitsUtil_1.BitsUtil.HEADER_SIZE + payloadSize;
        var buffer = safe_buffer_1.Buffer.allocUnsafe(totalSize);
        var message = new ClientMessage(buffer);
        message.setDataOffset(BitsUtil_1.BitsUtil.HEADER_SIZE);
        message.setVersion(BitsUtil_1.BitsUtil.VERSION);
        message.setFrameLength(totalSize);
        message.setFlags(0xc0);
        message.setPartitionId(-1);
        return message;
    };
    ClientMessage.prototype.getBuffer = function () {
        return this.buffer;
    };
    ClientMessage.prototype.getCorrelationId = function () {
        var offset = BitsUtil_1.BitsUtil.CORRELATION_ID_FIELD_OFFSET;
        return this.readLongInternal(offset);
    };
    ClientMessage.prototype.setCorrelationId = function (value) {
        this.writeLongInternal(value, BitsUtil_1.BitsUtil.CORRELATION_ID_FIELD_OFFSET);
    };
    ClientMessage.prototype.getPartitionId = function () {
        return this.buffer.readInt32LE(BitsUtil_1.BitsUtil.PARTITION_ID_FIELD_OFFSET);
    };
    ClientMessage.prototype.setPartitionId = function (value) {
        this.buffer.writeInt32LE(value, BitsUtil_1.BitsUtil.PARTITION_ID_FIELD_OFFSET);
    };
    ClientMessage.prototype.setVersion = function (value) {
        this.buffer.writeUInt8(value, BitsUtil_1.BitsUtil.VERSION_FIELD_OFFSET);
    };
    ClientMessage.prototype.getMessageType = function () {
        return this.buffer.readUInt16LE(BitsUtil_1.BitsUtil.TYPE_FIELD_OFFSET);
    };
    ClientMessage.prototype.setMessageType = function (value) {
        this.buffer.writeUInt16LE(value, BitsUtil_1.BitsUtil.TYPE_FIELD_OFFSET);
    };
    ClientMessage.prototype.getFlags = function () {
        return this.buffer.readUInt8(BitsUtil_1.BitsUtil.FLAGS_FIELD_OFFSET);
    };
    ClientMessage.prototype.setFlags = function (value) {
        this.buffer.writeUInt8(value, BitsUtil_1.BitsUtil.FLAGS_FIELD_OFFSET);
    };
    ClientMessage.prototype.hasFlags = function (flags) {
        return this.getFlags() & flags;
    };
    ClientMessage.prototype.getFrameLength = function () {
        return this.buffer.readInt32LE(BitsUtil_1.BitsUtil.FRAME_LENGTH_FIELD_OFFSET);
    };
    ClientMessage.prototype.setFrameLength = function (value) {
        this.buffer.writeInt32LE(value, BitsUtil_1.BitsUtil.FRAME_LENGTH_FIELD_OFFSET);
    };
    ClientMessage.prototype.getDataOffset = function () {
        return this.buffer.readInt16LE(BitsUtil_1.BitsUtil.DATA_OFFSET_FIELD_OFFSET);
    };
    ClientMessage.prototype.setDataOffset = function (value) {
        this.buffer.writeInt16LE(value, BitsUtil_1.BitsUtil.DATA_OFFSET_FIELD_OFFSET);
    };
    ClientMessage.prototype.setRetryable = function (value) {
        this.isRetryable = value;
    };
    ClientMessage.prototype.appendByte = function (value) {
        this.buffer.writeUInt8(value, this.cursor);
        this.cursor += BitsUtil_1.BitsUtil.BYTE_SIZE_IN_BYTES;
    };
    ClientMessage.prototype.appendBoolean = function (value) {
        return this.appendByte(value ? 1 : 0);
    };
    ClientMessage.prototype.appendInt32 = function (value) {
        this.buffer.writeInt32LE(value, this.cursor);
        this.cursor += BitsUtil_1.BitsUtil.INT_SIZE_IN_BYTES;
    };
    ClientMessage.prototype.appendUint8 = function (value) {
        this.buffer.writeUInt8(value, this.cursor);
        this.cursor += BitsUtil_1.BitsUtil.BYTE_SIZE_IN_BYTES;
    };
    ClientMessage.prototype.appendLong = function (value) {
        this.writeLongInternal(value, this.cursor);
        this.cursor += BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
    };
    ClientMessage.prototype.appendString = function (value) {
        var length = value.length;
        this.buffer.writeInt32LE(length, this.cursor);
        this.cursor += 4;
        this.buffer.write(value, this.cursor);
        this.cursor += length;
    };
    ClientMessage.prototype.appendBuffer = function (buffer) {
        var length = buffer.length;
        this.appendInt32(length);
        buffer.copy(this.buffer, this.cursor);
        this.cursor += length;
    };
    ClientMessage.prototype.appendData = function (data) {
        this.appendBuffer(data.toBuffer());
    };
    ClientMessage.prototype.addFlag = function (value) {
        this.buffer.writeUInt8(value | this.getFlags(), BitsUtil_1.BitsUtil.FLAGS_FIELD_OFFSET);
    };
    ClientMessage.prototype.updateFrameLength = function () {
        this.setFrameLength(this.cursor);
    };
    ClientMessage.prototype.readData = function () {
        var dataPayload = this.readBuffer();
        return new HeapData_1.HeapData(dataPayload);
    };
    ClientMessage.prototype.readByte = function () {
        var value = this.buffer.readUInt8(this.cursor);
        this.cursor += BitsUtil_1.BitsUtil.BYTE_SIZE_IN_BYTES;
        return value;
    };
    ClientMessage.prototype.readBoolean = function () {
        return this.readByte() === 1;
    };
    ClientMessage.prototype.readUInt8 = function () {
        var value = this.buffer.readUInt8(this.cursor);
        this.cursor += BitsUtil_1.BitsUtil.BYTE_SIZE_IN_BYTES;
        return value;
    };
    ClientMessage.prototype.readInt32 = function () {
        var value = this.buffer.readInt32LE(this.cursor);
        this.cursor += BitsUtil_1.BitsUtil.INT_SIZE_IN_BYTES;
        return value;
    };
    ClientMessage.prototype.readLong = function () {
        var value = this.readLongInternal(this.cursor);
        this.cursor += BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
        return value;
    };
    ClientMessage.prototype.readString = function () {
        var length = this.buffer.readInt32LE(this.cursor);
        this.cursor += BitsUtil_1.BitsUtil.INT_SIZE_IN_BYTES;
        var value = this.buffer.toString('utf8', this.cursor, this.cursor + length);
        this.cursor += length;
        return value;
    };
    ClientMessage.prototype.readBuffer = function () {
        var size = this.buffer.readUInt32LE(this.cursor);
        this.cursor += BitsUtil_1.BitsUtil.INT_SIZE_IN_BYTES;
        var result = safe_buffer_1.Buffer.allocUnsafe(size);
        this.buffer.copy(result, 0, this.cursor, this.cursor + size);
        this.cursor += size;
        return result;
    };
    ClientMessage.prototype.isComplete = function () {
        return (this.cursor >= BitsUtil_1.BitsUtil.HEADER_SIZE) && (this.cursor === this.getFrameLength());
    };
    ClientMessage.prototype.readMapEntry = function () {
        // TODO
    };
    ClientMessage.prototype.writeLongInternal = function (value, offset) {
        if (!Long.isLong(value)) {
            value = Long.fromValue(value);
        }
        this.buffer.writeInt32LE(value.low, offset);
        this.buffer.writeInt32LE(value.high, offset + 4);
    };
    ClientMessage.prototype.readLongInternal = function (offset) {
        var low = this.buffer.readInt32LE(offset);
        var high = this.buffer.readInt32LE(offset + 4);
        return new Long(low, high);
    };
    return ClientMessage;
}());
module.exports = ClientMessage;
//# sourceMappingURL=ClientMessage.js.map