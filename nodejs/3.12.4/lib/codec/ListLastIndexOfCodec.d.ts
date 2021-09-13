import ClientMessage = require('../ClientMessage');
import { Data } from '../serialization/Data';
export declare class ListLastIndexOfCodec {
    static calculateSize(name: string, value: Data): number;
    static encodeRequest(name: string, value: Data): ClientMessage;
    static decodeResponse(clientMessage: ClientMessage, toObjectFunction?: (data: Data) => any): any;
}
