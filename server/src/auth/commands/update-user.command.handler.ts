import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import UserDomainService from '../../domain/services/user.domain.service';
import UpdateUserCommand from './update-user.command';

@CommandHandler(UpdateUserCommand)
class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly _userDomainService: UserDomainService) {}
  public async execute(command: UpdateUserCommand): Promise<void> {
    await this._userDomainService.update(command.email, command.id);
  }
}

export default UpdateUserCommandHandler;
