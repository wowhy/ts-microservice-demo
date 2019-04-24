import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from './jwt-payload.interface'

import { appConfig } from '../../config/app.config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig.jwtSecretKey
    })
  }

  async validate(payload: JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException()
    }
    return payload
  }
}
