import { Test, TestingModule } from '@nestjs/testing'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { ServiceProxyModule } from '../service-proxy/service-proxy.module'
import { AuthService } from './auth.service'

describe('Auth Controller', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'bearer' }), ServiceProxyModule],
      controllers: [AuthController],
      providers: [AuthService]
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
