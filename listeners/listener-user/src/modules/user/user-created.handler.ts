import { logger } from '@utils/logger'
import { IEventHandler } from '@utils/event'

export class UserCreatedHandler implements IEventHandler {
  static topic = 'user.create'

  async handle(data: any) {
    console.log(data)
  }
}
