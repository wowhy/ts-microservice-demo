import { Module } from '@nestjs/common'
import { HealthModule } from './modules/health/health.module'
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [HealthModule, AuthModule, UserModule]
})
export class AppModule {}
