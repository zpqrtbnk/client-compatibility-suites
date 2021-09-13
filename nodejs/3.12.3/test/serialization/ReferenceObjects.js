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

var Buffer = require('safe-buffer').Buffer;
var Long = require('long');
var AnInnerPortable = require('./AnInnerPortable');
var AnIdentifiedDataSerializable = require('./AnIdentifiedDataSerializable');
var APortable = require('./APortable');
var CustomByteArraySerializable = require('./CustomSerializable').CustomByteArraySerializable;
var CustomStreamSerializable = require('./CustomSerializable').CustomStreamSerializable;
var HeapData = require('../../lib/serialization/HeapData').HeapData;

var to = {};
to.aNULL = null;
to.aBoolean = true;
to.aByte = 113;
to.aCharacter = 'x';
to.aDouble = -897543.3678909;
to.aShort = -500;
to.aFloat = 900.5678;
to.anInteger = 56789;
to.aLong = Long.fromNumber(-50992225);
to.aString = ''; //TODO

for (var ci = 0; ci < 65535; ci++) {
    if (!(ci >= 55296 && ci < 57344)) {
        to.aString += String.fromCharCode(ci);
    }
}
for (var ci = 65535 - to.aString.length; ci > 0; ci--) {
    to.aString += String.fromCharCode(0);
}


to.booleans = [true, false, true];
to.bytes = [112, 4, -1, 4, 112, -35, 43];
to.chars = ['a', 'b', 'c'];
to.doubles = [-897543.3678909, 11.1, 22.2, 33.3];
to.shorts = [-500, 2, 3];
to.floats = [900.5678, 1.0, 2.1, 3.4];
to.ints = [56789, 2, 3];
to.longs = [Long.fromNumber(-50992225), Long.fromNumber(1231232141), Long.fromNumber(2), Long.fromNumber(3)];
to.Strings = ['Pijamalı hasta, yağız şoföre çabucak güvendi.',
    'イロハニホヘト チリヌルヲ ワカヨタレソ ツネナラム',
    'The quick brown fox jumps over the lazy dog'];
to.AnInnerPortable = new AnInnerPortable(to.anInteger, to.aFloat);
to.aCustomStreamSerializable = new CustomStreamSerializable(to.anInteger, to.aFloat);
to.aCustomByteArraySerializable = new CustomByteArraySerializable(to.anInteger, to.aFloat);

exports.aData = new HeapData(Buffer.from('111313123131313131'));

to.AnIdentifiedDataSerializable = new AnIdentifiedDataSerializable(to.aBoolean, to.aByte, to.aCharacter, to.aDouble, to.aShort
    , to.aFloat, to.anInteger, to.aLong, to.aString, to.booleans, to.bytes, to.chars, to.doubles, to.shorts, to.floats
    , to.ints, to.longs, to.Strings, to.AnInnerPortable, null, to.aCustomStreamSerializable, to.aCustomByteArraySerializable,
    exports.aData);
to.APortable = new APortable(to.aBoolean, to.aByte, to.aCharacter, to.aDouble, to.aShort, to.aFloat, to.anInteger, to.aLong,
    to.aString, to.AnInnerPortable, to.booleans, to.bytes, to.chars, to.doubles, to.shorts, to.floats, to.ints, to.longs,
    to.Strings, exports.portables, to.AnIdentifiedDataSerializable, to.aCustomStreamSerializable, to.aCustomByteArraySerializable,
    exports.aData);
to.aDate = new Date(Date.UTC(1990, 2, 1, 0, 0, 0, 0));
to.aClass = 'java.math.BigDecimal';

exports.portables = [to.AnInnerPortable, to.AnInnerPortable, to.AnInnerPortable];
exports.testObjects = to;
exports.skipOnSerialize = {
    'AnIdentifiedDataSerializable': true,
    'APortable': true,
    'aClass': true
};
exports.PORTABLE_FACTORY_ID = 1;
exports.PORTABLE_CLASS_ID = 1;
exports.INNER_PORTABLE_CLASS_ID = 2;
exports.IDENTIFIED_DATA_SERIALIZABLE_FACTORY_ID = 1;
exports.IDENTIFIED_DATA_SERIALIZABLE_CLASS_ID = 1;
exports.CUSTOM_BYTE_ARRAY_SERILAZABLE_ID = 2;
exports.CUSTOM_STREAM_SERILAZABLE_ID = 1;

