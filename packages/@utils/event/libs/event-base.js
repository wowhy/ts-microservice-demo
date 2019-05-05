"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v1");
class EventBase {
    constructor(eventName, aggregateId, data) {
        this.id = uuid();
        this.timestamp = new Date();
        this.eventName = eventName;
        this.aggregateId = aggregateId;
        this.data = data;
    }
}
exports.EventBase = EventBase;
//# sourceMappingURL=event-base.js.map