import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface'
import { UserServiceProxy } from '../service-proxy/user-proxy'
import { CreateTokenDto } from './auth.dto'
import * as uuid from 'uuid'
import { addHours, addMonths, compareAsc } from 'date-fns'
import { logger } from '@utils/logger'

@Injectable()
export class AuthService {
  constructor(private readonly userServiceProxy: UserServiceProxy, private readonly jwtService: JwtService) {}

  async createToken({ userName, password }: CreateTokenDto) {
    const [user] = await this.userServiceProxy.UserService.getMany({
      filter: `userName||eq||${userName}`,
      limit: 1
    } as any)

    if (!user) {
      throw new BadRequestException('账号或密码错误')
    }

    const { data: passwordHash } = await this.userServiceProxy.UserService.passwordHash({
      getPasswordHashDto: {
        password,
        salt: user.salt
      }
    })

    if (passwordHash !== user.password) {
      throw new BadRequestException('账号或密码错误')
    }

    const accessToken = await this.userServiceProxy.AccessTokenService.createOne({
      accessToken: {
        userId: user.id,
        scope: '',
        accessToken: uuid.v4(),
        accessTokenExpiresAt: addHours(new Date(), 2).toISOString(),
        refreshToken: uuid.v4(),
        refreshTokenExpiresAt: addMonths(new Date(), 1).toISOString()
      }
    } as any)

    const payload: JwtPayload = {
      userId: user.id,
      scope: accessToken.scope,
      accessToken: accessToken.accessToken
    }

    return {
      expiresIn: 2 * 60 * 60,
      accessToken: this.jwtService.sign(payload)
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    try {
      const [accessToken] = await this.userServiceProxy.AccessTokenService.getMany({
        filter: `accessToken||eq||${payload.accessToken}`,
        limit: 1
      } as any)

      if (!accessToken) {
        throw new UnauthorizedException()
      }

      if (compareAsc(new Date(), accessToken.accessTokenExpiresAt) >= 0) {
        throw new UnauthorizedException()
      }

      const user = await this.userServiceProxy.UserService.getOne({
        id: payload.userId
      })

      if (!user) {
        throw new UnauthorizedException()
      }

      return user
    } catch (ex) {
      if (ex.status === 404) {
        logger.error(ex)
        throw new UnauthorizedException()
      }

      throw ex
    }
  }
}
