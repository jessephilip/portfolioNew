import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from '../database/database.module';
import { DomainModule } from './../domain/domain.module';
import { AuthController } from './auth.controller';
import DeleteUserCommandHandler from './commands/delete-user.command.handler';
import RegisterCommandHandler from './commands/register.command.handler';
import UpdateUserCommandHandler from './commands/update-user.command.handler';
import GetUserByEmailQueryHandler from './queries/get-user.query.handler';
import LoginQueryHandler from './queries/login.query.handler';

const queryHandlers = [LoginQueryHandler, GetUserByEmailQueryHandler];
const commandHandlers = [
  RegisterCommandHandler,
  UpdateUserCommandHandler,
  DeleteUserCommandHandler,
];

@Module({
  imports: [CqrsModule, DatabaseModule, DomainModule],
  controllers: [AuthController],
  providers: [...queryHandlers, ...commandHandlers],
})
export class AuthModule {}
