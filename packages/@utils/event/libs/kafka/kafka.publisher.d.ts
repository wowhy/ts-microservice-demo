import { Producer } from 'kafka-node';
import { IEventPublisher, IEvent } from '../interfaces';
export declare class KafkaEventPublisher implements IEventPublisher {
    private topic;
    private producer;
    constructor(topic: string, producer: Producer);
    publish(e: IEvent): Promise<void>;
}
