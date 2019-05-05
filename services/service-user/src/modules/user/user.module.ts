import { Module } from '@nestjs/common'
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
export class UserModule {}
