import { Module } from '@nestjs/common';

import UserRepository from './repositories/user.repository';

@Module({
  controllers: [],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class DatabaseModule {}
