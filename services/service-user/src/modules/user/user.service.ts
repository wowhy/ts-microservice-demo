import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FilterParamParsed } from '@nestjsx/crud'
import { RepositoryService } from '@nestjsx/crud/typeorm'

import { createHash, randomBytes } from 'crypto'

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

  async createOne(data: User, params: FilterParamParsed[]): Promise<User> {
    const user = await super.createOne(data, params)
    this.eventPublisher.publish(new UserCreatedEvent(user.id, user))
    return user
  }

  passwordHash(password, salt) {
    const md5 = createHash('md5')
    try {
      return md5.update(password + salt).digest('hex')
    } finally {
      md5.destroy()
    }
  }

  generateSalt() {
    return randomBytes(2).toString('hex')
  }

  generateNickName() {
    return randomBytes(2).toString('base64')
  }
}
