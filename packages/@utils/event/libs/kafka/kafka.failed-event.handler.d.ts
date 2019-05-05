import { IFailedEventHandler } from '../interfaces';
export declare class KafkaFailedEventHandler implements IFailedEventHandler {
    private KeyedMessage;
    private producer;
    constructor(KeyedMessage: any, producer: any);
    handle(message: any): Promise<void>;
}
