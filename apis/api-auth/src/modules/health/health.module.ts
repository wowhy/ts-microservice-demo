import { HealthModuleRoot, PingCheckService } from '@modules/health'

export const HealthModule = HealthModuleRoot.forRootAsync({
  useClass: PingCheckService
})
