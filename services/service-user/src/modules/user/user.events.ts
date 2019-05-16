import { EventBase } from '@utils/event'

export class UserCreatedEvent extends EventBase {
  constructor(aggregateId: string, data: any) {
    super('UserCreated', aggregateId, data)
  }
}
