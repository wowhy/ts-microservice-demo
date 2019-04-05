import * as uuid from 'uuid'
import { IEvent } from './interfaces'

export class EventBase implements IEvent {
  id: string
  timestamp: Date | string
  aggregateId: string
  eventName: string
  data: any

  constructor(eventName: string, aggregateId: string, data: any) {
    this.id = uuid.v4()
    this.timestamp = new Date()

    this.eventName = eventName
    this.aggregateId = aggregateId
    this.data = data
  }
}
