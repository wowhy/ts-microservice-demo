import { Injectable, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface'
import { UserServiceProxy } from '../service-proxy/proxy/user.proxy'
import { CreateTokenDto } from './auth.dto'

@Injectable()
export class AuthService {
  constructor(private readonly userServiceProxy: UserServiceProxy, private readonly jwtService: JwtService) {}

  async createToken({ userName, password }: CreateTokenDto) {
    const [user] = await this.userServiceProxy.getMany({
      limit: 1,
      filter: `userName|eq|${userName}`
    } as any)

    if (!user) {
      throw new BadRequestException('账号或密码错误')
    }

    const { data: passwordHash } = await this.userServiceProxy.passwordHash({
      getPasswordHashDto: {
        password,
        salt: user.salt
      }
    })

    if (passwordHash !== user.password) {
      throw new BadRequestException('账号或密码错误')
    }

    const payload: JwtPayload = {
      type: 'user',
      id: user.id,
      userName: user.userName,
      nickName: user.nickName
    }
    const accessToken = this.jwtService.sign(payload)
    return {
      expiresIn: 3600,
      accessToken
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return payload
  }
}
