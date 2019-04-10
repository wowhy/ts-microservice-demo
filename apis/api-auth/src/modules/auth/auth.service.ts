import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken() {
    const user: JwtPayload = { id: '', email: 'test@email.com' }
    const accessToken = this.jwtService.sign(user)
    return {
      expiresIn: 3600,
      accessToken
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return payload
  }
}
