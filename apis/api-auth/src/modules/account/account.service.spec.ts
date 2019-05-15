import { Test, TestingModule } from '@nestjs/testing'
import { AccountService } from './account.service'
import { ServiceProxyModule } from '../service-proxy/service-proxy.module'

describe('AccountService', () => {
  let service: AccountService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServiceProxyModule],
      providers: [AccountService]
    }).compile()

    service = module.get<AccountService>(AccountService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
