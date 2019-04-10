import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller('user')
export class UserController {
  @Get()
  @UseGuards(AuthGuard('bearer'))
  test() {
    return 'hello'
  }
}
