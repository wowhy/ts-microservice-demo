import { IEventDispatcher, IEvent, IEventHandler, IHandlerResolver } from './interfaces'

export class SimpleEventDispatcher implements IEventDispatcher {
  private routes: any = {}

  register(eventName: string, handler: IEventHandler | IHandlerResolver | (() => IEventHandler)) {
    if ((handler as IHandlerResolver).moduleRef) {
      const { moduleRef, type } = handler as IHandlerResolver
      this.routes[eventName] = () => moduleRef.get(type)
    } else {
      this.routes[eventName] = handler
    }
  }

  async dispatch(e: IEvent) {
    if (this.routes[e.eventName]) {
      const resolver = this.routes[e.eventName]
      if (typeof resolver === 'function') {
        await resolver().handle(e)
      } else if (resolver.handle) {
        await resolver.handle(e)
      }
    }
  }
}
