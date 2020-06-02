import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import UserDomainService from '../../domain/services/user.domain.service';
import RegisterCommand from './register.command';

@CommandHandler(RegisterCommand)
class RegisterCommandHandler implements ICommandHandler<RegisterCommand> {
  constructor(private readonly _userDomainService: UserDomainService) {}
  public async execute(command: RegisterCommand): Promise<void> {
    await this._userDomainService.create(command.email);
  }
}

export default RegisterCommandHandler;
