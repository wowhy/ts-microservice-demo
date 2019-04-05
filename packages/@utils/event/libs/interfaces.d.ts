import { ModuleRef } from '@nestjs/core';
export interface IEvent {
    id: string;
    aggregateId: string;
    eventName: string;
    timestamp: Date | string;
    data: any;
}
export interface IEventHandler {
    handle(e: IEvent): Promise<void>;
}
export interface IEventPublisher {
    publish: (e: IEvent) => Promise<void>;
}
export interface IHandlerResolver {
    moduleRef: ModuleRef;
    type: any;
}
export interface IEventDispatcher {
    register(eventName: string, handler: IEventHandler | IHandlerResolver | (() => IEventHandler)): any;
    dispatch(e: IEvent): Promise<any>;
}
export interface IEventSubscriber {
    dispatcher: IEventDispatcher;
    subscribe: () => Promise<void>;
    handler: (e: IEvent) => Promise<any>;
}
