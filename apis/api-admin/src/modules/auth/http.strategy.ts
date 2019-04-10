import { Strategy } from 'passport-http-bearer'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import Axios from 'axios'

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor() {
    super()
  }

  async validate(token: string) {
    if (token) {
      try {
        const res = await Axios.request({
          method: 'GET',
          url: 'http://api-auth:8000/api/auth/userinfo',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        return res.data
      } catch (ex) {
        if (ex.response) {
          if (ex.response.statusCode === 401) {
            throw new UnauthorizedException()
          } else if (ex.response.data) {
            throw ex.response.data
          }
        }

        throw ex
      }
    }

    throw new UnauthorizedException()
  }
}
