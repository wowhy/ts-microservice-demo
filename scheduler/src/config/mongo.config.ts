import { env } from '@utils/env'

export const mongoConfig = {
  address: env.MONGO_ADDRESS,
  options: {
    useNewUrlParser: true
  }
}
