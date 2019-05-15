import { Test, TestingModule } from '@nestjs/testing'
import { PassportModule } from '@nestjs/passport'
import { UserController } from './user.controller'
import { ServiceProxyModule } from '../service-proxy/service-proxy.module'

describe('User Controller', () => {
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'bearer' }), ServiceProxyModule],
      controllers: [UserController]
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
