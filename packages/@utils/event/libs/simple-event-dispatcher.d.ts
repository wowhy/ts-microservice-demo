import { IEventDispatcher, IEvent, IEventHandler, IHandlerResolver } from './interfaces';
export declare class SimpleEventDispatcher implements IEventDispatcher {
    private routes;
    register(eventName: string, handler: IEventHandler | IHandlerResolver | (() => IEventHandler)): void;
    dispatch(e: IEvent): Promise<void>;
}
