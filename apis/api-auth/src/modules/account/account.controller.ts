import { Controller, Post, Body } from '@nestjs/common'
import { AccountService } from './account.service'
import { RegisterDto } from './account.dto'

@Controller('account')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Post('register')
  async register(@Body() { userName, password }: RegisterDto) {
    return {
      data: await this.service.register(userName, password)
    }
  }
}
