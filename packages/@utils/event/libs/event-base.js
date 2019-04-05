"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
class EventBase {
    constructor(eventName, aggregateId, data) {
        this.id = uuid.v4();
        this.timestamp = new Date();
        this.eventName = eventName;
        this.aggregateId = aggregateId;
        this.data = data;
    }
}
exports.EventBase = EventBase;
//# sourceMappingURL=event-base.js.map