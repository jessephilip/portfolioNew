import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import UserDomainService from '../../domain/services/user.domain.service';
import DeleteUserCommand from './delete-user.command';

@CommandHandler(DeleteUserCommand)
class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly _userDomainService: UserDomainService) {}
  public async execute(command: DeleteUserCommand): Promise<void> {
    await this._userDomainService.delete(command.id);
  }
}

export default DeleteUserCommandHandler;
