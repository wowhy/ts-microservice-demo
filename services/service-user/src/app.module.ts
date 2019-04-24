import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ormConfig } from './config/orm.config'
import { HealthModule } from './modules/health/health.module'
import { UserModule } from './modules/user/user.module'
import { RoleModule } from './modules/role/role.module'
import { AccessTokenModule } from './modules/accessToken/access-token.module'

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), HealthModule, UserModule, RoleModule, AccessTokenModule]
})
export class AppModule {}
