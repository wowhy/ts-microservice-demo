import { IEventPublisher, IEvent } from '../interfaces';
export declare class KafkaEventPublisher implements IEventPublisher {
    private KeyedMessage;
    private producer;
    constructor(KeyedMessage: any, producer: any);
    publish(e: IEvent): Promise<void>;
}
