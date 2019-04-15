import { Module } from '@nestjs/common'
import { HealthModule } from './modules/health/health.module'
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [HealthModule, AuthModule, AccountModule]
})
export class AppModule {}
