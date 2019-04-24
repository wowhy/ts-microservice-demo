import {
  HealthIndicatorResult,
  TerminusEndpoint,
  TerminusOptionsFactory,
  DNSHealthIndicator,
  TerminusModuleOptions
} from '@nestjs/terminus'
import { Injectable, Inject } from '@nestjs/common'
import { HealthCheckError } from '@godaddy/terminus'
import { UserServiceProxy } from '../service-proxy/user-proxy'

@Injectable()
export class PingCheckService implements TerminusOptionsFactory {
  constructor(
    private readonly dns: DNSHealthIndicator,
    @Inject('UserServiceProxy') private readonly userServiceProxy: UserServiceProxy
  ) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [() => this.dns.pingCheck('baidu', 'https://baidu.com'), () => this.check()]
    }
    return {
      endpoints: [healthEndpoint]
    }
  }

  async check() {
    const res: HealthIndicatorResult = {}

    try {
      await this.userServiceProxy.UserService.getMany({ limit: 1 } as any)
      res['user-service'] = {
        status: 'up'
      }
    } catch (ex) {
      res['user-service'] = {
        status: 'error',
        message: ex.message
      }

      throw new HealthCheckError('Dogcheck failed', res)
    }

    return res
  }
}
