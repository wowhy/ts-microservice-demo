import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ormConfig } from '../../config/orm.config'
import { User } from '../../entities/user.entity'
import { UserService } from './user.service'
import { eventPublisherProvider } from '../../providers/event.publisher'

import { UserController } from './user.controller'

describe('User Controller', () => {
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormConfig), TypeOrmModule.forFeature([User])],
      controllers: [UserController],
      providers: [UserService, eventPublisherProvider]
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
