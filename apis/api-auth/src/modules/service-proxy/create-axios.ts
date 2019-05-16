import Axios, { AxiosRequestConfig } from 'axios'
import { HttpException, ServiceUnavailableException } from '@nestjs/common'
import { appConfig } from '../../config/app.config'
import * as jwt from 'jsonwebtoken'
import * as https from 'https'
import * as fs from 'fs'
import * as path from 'path'

const ca = fs.readFileSync(path.join(process.cwd(), '/secrets/public.crt'))

function sign(payload: string | Object | Buffer, options?: jwt.SignOptions): string {
  return jwt.sign(payload, appConfig.jwtSecretKey, options)
}

export function createAxios(baseURL: string) {
  const axios = Axios.create({
    baseURL,
    httpsAgent: new https.Agent({
      ca,
      rejectUnauthorized: false
    })
  })

  axios.interceptors.request.use((config: AxiosRequestConfig & { user?: any }) => {
    if (config.user) {
      config.headers['Authorization'] = `Bearer ${sign(config.user)}`
    } else {
      config.headers['Authorization'] =
        'Bearer ' +
        sign({
          id: '00000000-0000-0000-0000-00000000000000',
          userName: 'admin',
          nickName: 'admin'
        })
    }

    return config
  })

  axios.interceptors.response.use(
    res => res,
    error => {
      if (error.response) {
        const { status, data } = error.response
        if (status === 503) {
          return Promise.reject(new ServiceUnavailableException())
        }

        return Promise.reject(new HttpException(data, status))
      }

      return Promise.reject(new ServiceUnavailableException())
    }
  )

  return axios
}
