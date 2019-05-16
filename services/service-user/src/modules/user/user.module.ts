import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '../../entities/user.entity'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { eventPublisherProvider } from '../../providers/event.publisher'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, eventPublisherProvider]
})
export class UserModule implements OnModuleInit {
  constructor(private readonly service: UserService) {}

  async onModuleInit() {
    const [exists] = (await this.service.getMany({
      filter: [
        {
          field: 'userName',
          operator: 'eq',
          value: 'admin'
        }
      ],
      limit: 1
    })) as any[]

    if (!exists) {
      const userName = 'admin'
      const nickName = 'Administrator'
      const salt = this.service.generateSalt()
      const password = this.service.passwordHash('admin', salt)

      await this.service.createOne(
        {
          userName,
          password,
          salt,
          nickName
        } as any,
        []
      )
    }
  }
}
