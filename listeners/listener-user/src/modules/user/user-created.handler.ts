import { logger } from '@utils/logger'
import { IEventHandler } from '@utils/event'

export class UserCreatedHandler implements IEventHandler {
  static topic = 'user.create'

  async handle(data: any) {
    if (Math.random() * 10 > 7) {
      
    } else {
      throw new Error('random exception')
    }
  }
}
