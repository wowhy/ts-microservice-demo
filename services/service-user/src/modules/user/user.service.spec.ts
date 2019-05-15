import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ormConfig } from '../../config/orm.config'
import { User } from '../../entities/user.entity'
import { UserService } from './user.service'
import { eventPublisherProvider } from '../../providers/event.publisher'

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormConfig), TypeOrmModule.forFeature([User])],
      providers: [UserService, eventPublisherProvider]
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
