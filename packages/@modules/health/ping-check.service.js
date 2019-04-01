const { DNSHealthIndicator } = require('@nestjs/terminus')
const { Injectable } = require('@nestjs/common')

let PingCheckService = class PingCheckService {
  constructor(dns) {
    this.dns = dns
  }
  createTerminusOptions() {
    const healthEndpoint = {
      url: '/health',
      healthIndicators: [async () => this.dns.pingCheck('baidu', 'https://baidu.com')]
    }
    return {
      endpoints: [healthEndpoint]
    }
  }
}

PingCheckService = Reflect.decorate(
  [Injectable(), Reflect.metadata('design:paramtypes', [DNSHealthIndicator])],
  PingCheckService
)

exports.PingCheckService = PingCheckService
