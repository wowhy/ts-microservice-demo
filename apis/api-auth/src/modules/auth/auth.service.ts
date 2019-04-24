import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common'
import { UserServiceProxy } from '../service-proxy/user-proxy'
import { CreateTokenDto } from './auth.dto'
import * as uuid from 'uuid/v1'
import { addHours, addMonths, compareAsc } from 'date-fns'
import { logger } from '@utils/logger'

@Injectable()
export class AuthService {
  constructor(private readonly userServiceProxy: UserServiceProxy) {}

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
        accessToken: uuid(),
        accessTokenExpiresAt: addHours(new Date(), 2).toISOString(),
        refreshToken: uuid(),
        refreshTokenExpiresAt: addMonths(new Date(), 1).toISOString()
      }
    } as any)

    return {
      expiresIn: 2 * 60 * 60,
      accessToken: accessToken.accessToken
    }
  }

  async validateToken(token: string): Promise<any> {
    try {
      const [accessToken] = await this.userServiceProxy.AccessTokenService.getMany({
        filter: `accessToken||eq||${token}`,
        limit: 1
      } as any)

      if (!accessToken) {
        throw new UnauthorizedException()
      }

      if (compareAsc(new Date(), accessToken.accessTokenExpiresAt) >= 0) {
        throw new UnauthorizedException()
      }

      const user = await this.userServiceProxy.UserService.getOne({
        id: accessToken.userId
      })

      if (!user) {
        throw new UnauthorizedException()
      }

      return {
        id: user.id,
        userName: user.userName,
        nickName: user.nickName
      }
    } catch (ex) {
      if (ex.status === 404) {
        logger.error(ex)
        throw new UnauthorizedException()
      }

      throw ex
    }
  }
}
