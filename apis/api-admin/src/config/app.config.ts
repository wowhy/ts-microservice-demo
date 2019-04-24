import { env } from '@utils/env'

export const appConfig = {
  port: env.PORT || 3000,
  jwtSecretKey: env.JWT_SECRETKEY
}
