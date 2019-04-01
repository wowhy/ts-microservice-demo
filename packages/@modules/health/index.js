const { TerminusModule } = require('@nestjs/terminus')
const { PingCheckService } = require('./ping-check.service.js')

exports.HealthModuleRoot = TerminusModule
exports.PingCheckService = PingCheckService
