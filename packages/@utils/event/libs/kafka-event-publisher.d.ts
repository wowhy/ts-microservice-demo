import { Producer } from 'kafka-node';
import { IEventPublisher, IEvent } from './interfaces';
export declare class KafkaEventPublisher implements IEventPublisher {
    private producer;
    constructor(producer: Producer);
    publish(e: IEvent): Promise<void>;
}
