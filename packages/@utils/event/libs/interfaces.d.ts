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
    moduleRef: any;
    type: any;
}
export interface IEventDispatcher {
    register(eventName: string, handler: IEventHandler | IHandlerResolver | (() => IEventHandler)): any;
    dispatch(e: IEvent): Promise<any>;
}
export interface IEventSubscriber {
    subscribe(): Promise<void>;
    handle(e: IEvent): Promise<any>;
}
export interface IMsgFailedHandler {
    handle(message: any): Promise<void>;
}
