import { Controller } from '@nestjs/common'
import { ApiUseTags } from '@nestjs/swagger'
import { Crud } from '@nestjsx/crud'

import { AccessToken } from '../../entities/access-token.entity'
import { AccessTokenService } from './access-token.service'
import { makeRouteOperationId } from '@utils/typeorm'

@ApiUseTags('AccessToken')
@Crud(AccessToken, {
  routes: makeRouteOperationId({}),
  params: {
    id: 'uuid'
  }
})
@Controller('access-tokens')
export class AccessTokenController {
  constructor(public service: AccessTokenService) {}
}
