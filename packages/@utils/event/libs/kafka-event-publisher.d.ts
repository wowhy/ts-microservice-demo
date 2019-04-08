import { IEventPublisher, IEvent } from './interfaces';
export declare class KafkaEventPublisher implements IEventPublisher {
    private producer;
    constructor(KeyedMessage, producer);
    publish(e: IEvent): Promise<void>;
}
