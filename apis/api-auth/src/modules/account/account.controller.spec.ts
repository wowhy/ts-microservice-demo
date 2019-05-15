import { Test, TestingModule } from '@nestjs/testing'
import { PassportModule } from '@nestjs/passport'
import { AccountController } from './account.controller'
import { ServiceProxyModule } from '../service-proxy/service-proxy.module'
import { AccountService } from './account.service'

describe('Account Controller', () => {
  let controller: AccountController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'bearer' }), ServiceProxyModule],
      controllers: [AccountController],
      providers: [AccountService]
    }).compile()

    controller = module.get<AccountController>(AccountController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
