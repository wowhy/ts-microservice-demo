import { Controller, Post, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  async createToken(): Promise<any> {
    return await this.authService.createToken()
  }

  @UseGuards(AuthGuard())
  @Get('userinfo')
  async validateToken(@Req() req): Promise<any> {
    return req.user
  }
}
