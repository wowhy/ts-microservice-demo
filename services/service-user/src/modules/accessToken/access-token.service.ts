import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RepositoryService } from '@nestjsx/crud/typeorm'

import { AccessToken } from '../../entities/access-token.entity'

@Injectable()
export class AccessTokenService extends RepositoryService<AccessToken> {
  constructor(@InjectRepository(AccessToken) repo) {
    super(repo)
  }
}
