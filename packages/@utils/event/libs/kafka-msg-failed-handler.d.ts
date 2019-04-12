import { IMsgFailedHandler } from './interfaces';
export declare class KafkaMsgFailedHandler implements IMsgFailedHandler {
    private KeyedMessage;
    private producer;
    constructor(KeyedMessage: any, producer: any);
    handle(message: any): Promise<void>;
}
