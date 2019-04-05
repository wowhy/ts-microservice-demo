import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RepositoryService } from '@nestjsx/crud/typeorm'

import { User } from '../../entities/user.entity'

@Injectable()
export class UserService extends RepositoryService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo)
  }
}
