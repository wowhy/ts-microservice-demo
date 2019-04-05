import { ConsumerGroup } from 'kafka-node';
import { IEventDispatcher, IEvent, IEventSubscriber } from './interfaces';
export declare class KafkaEventSubscriber implements IEventSubscriber {
    dispatcher: IEventDispatcher;
    private consumer;
    constructor(dispatcher: IEventDispatcher, consumer: ConsumerGroup);
    subscribe(): Promise<void>;
    handler(e: IEvent): Promise<void>;
}
