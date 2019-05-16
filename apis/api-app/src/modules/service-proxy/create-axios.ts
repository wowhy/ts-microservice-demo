import { AxiosInstance } from 'axios'
import * as superagent from 'superagent'
import { HttpException, ServiceUnavailableException } from '@nestjs/common'
import { appConfig } from '../../config/app.config'
import * as jwt from 'jsonwebtoken'

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
process.env.HTTP2_TEST = 'true'

function sign(payload: string | Object | Buffer, options?: jwt.SignOptions): string {
  return jwt.sign(payload, appConfig.jwtSecretKey, options)
}

function errorHandler(error) {
  if (error.response) {
    const { status, body } = error.response

    if (status === 503) {
      return Promise.reject(new ServiceUnavailableException())
    }

    return Promise.reject(new HttpException(body, status))
  }

  return Promise.reject(new ServiceUnavailableException())
}

export function createAxios(baseURL: string): AxiosInstance {
  return {
    request(configs) {
      if (configs.user) {
        configs.headers['Authorization'] = `Bearer ${sign(configs.user)}`
      } else {
        configs.headers['Authorization'] =
          'Bearer ' +
          sign({
            id: '00000000-0000-0000-0000-00000000000000',
            userName: 'admin',
            nickName: 'admin'
          })
      }

      switch (configs.method) {
        case 'get':
        case 'delete':
          return superagent[configs.method](`${baseURL}${configs.url}`)
            .set(configs.headers)
            .query(configs.params)
            .then(res => {
              ;(res as any).data = res.body
              return res
            }, errorHandler)

        case 'post':
        case 'put':
        case 'patch':
          return superagent[configs.method](`${baseURL}${configs.url}`)
            .set(configs.headers)
            .query(configs.params)
            .send(configs.data)
            .then(res => {
              ;(res as any).data = res.body
              return res
            }, errorHandler)
      }
    }
  } as any
}
