"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleEventDispatcher {
    constructor() {
        this.routes = {};
    }
    register(eventName, handler) {
        if (handler.moduleRef) {
            const { moduleRef, type } = handler;
            this.routes[eventName] = () => moduleRef.get(type);
        }
        else {
            this.routes[eventName] = handler;
        }
    }
    async dispatch(e) {
        if (this.routes[e.eventName]) {
            const resolver = this.routes[e.eventName];
            if (typeof resolver === 'function') {
                await resolver().handle(e);
            }
            else if (resolver.handle) {
                await resolver.handle(e);
            }
        }
    }
}
exports.SimpleEventDispatcher = SimpleEventDispatcher;
//# sourceMappingURL=simple.dispatcher.js.map