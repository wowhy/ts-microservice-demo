import { Controller, Post, Get, Req, UseGuards, Body } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { CreateTokenDto } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  async createToken(@Body() body: CreateTokenDto): Promise<any> {
    return await this.authService.createToken(body)
  }

  @UseGuards(AuthGuard())
  @Get('userinfo')
  async validateToken(@Req() req): Promise<any> {
    return req.user
  }
}
