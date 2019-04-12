import { IEventDispatcher, IEvent, IEventSubscriber, IMsgFailedHandler } from './interfaces';
export declare class KafkaEventSubscriber implements IEventSubscriber {
    private consumer;
    private dispatcher;
    private msgFailedHandler;
    constructor(consumer: any, dispatcher: IEventDispatcher, msgFailedHandler: IMsgFailedHandler);
    subscribe(): Promise<void>;
    handle(e: IEvent): Promise<void>;
}
