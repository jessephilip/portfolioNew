import { Module } from '@nestjs/common';

import UserRepository from '../database/repositories/user.repository';
import UserDomainService from './services/user.domain.service';

@Module({
  controllers: [],
  providers: [UserDomainService, UserRepository],
  exports: [UserDomainService],
})
export class DomainModule {}
