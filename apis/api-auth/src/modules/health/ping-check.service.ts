import {
  TerminusEndpoint,
  TerminusOptionsFactory,
  DNSHealthIndicator,
  TerminusModuleOptions
} from '@nestjs/terminus'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PingCheckService implements TerminusOptionsFactory {
  constructor(private readonly dns: DNSHealthIndicator) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [async () => this.dns.pingCheck('baidu', 'https://baidu.com')]
    }
    return {
      endpoints: [healthEndpoint]
    }
  }
}
