import { IEventDispatcher, IEvent, IEventSubscriber, IFailedEventHandler } from '../interfaces';
export declare class KafkaEventSubscriber implements IEventSubscriber {
    private consumer;
    private dispatcher;
    private failedEventHandler;
    constructor(consumer: any, dispatcher: IEventDispatcher, failedEventHandler: IFailedEventHandler);
    subscribe(): Promise<void>;
    handle(e: IEvent): Promise<void>;
}
