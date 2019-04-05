import { IEvent } from './interfaces';
export declare class EventBase implements IEvent {
    id: string;
    timestamp: Date | string;
    aggregateId: string;
    eventName: string;
    data: any;
    constructor(eventName: string, aggregateId: string, data: any);
}
