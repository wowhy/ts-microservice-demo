import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RepositoryService } from '@nestjsx/crud/typeorm'

import { IEventPublisher } from '@utils/event'

import { User } from '../../entities/user.entity'
import { UserCreatedEvent } from './user.events'

@Injectable()
export class UserService extends RepositoryService<User> {
  constructor(
    @InjectRepository(User) repo,
    @Inject('eventPublisher') private eventPublisher: IEventPublisher
  ) {
    super(repo)
  }

  async getMany(query, options) {
    const result = await super.getMany(query, options)
    await this.eventPublisher.publish(new UserCreatedEvent('1', query))
    return result
  }
}
