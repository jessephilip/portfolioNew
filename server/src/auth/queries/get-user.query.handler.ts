import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import UserRepository, { UserDTO } from '../../database/repositories/user.repository';
import GetUserByEmailQuery from './get-user.query';

@QueryHandler(GetUserByEmailQuery)
class GetUserByEmailQueryHandler implements IQueryHandler<GetUserByEmailQuery> {
  constructor(private _userRepository: UserRepository) {}

  public async execute(query: GetUserByEmailQuery): Promise<UserDTO> {
    const possibleUsers = await this._userRepository.readByEmail(query.email);

    if (possibleUsers === null) {
      throw new Error(
        `Not Found Error: There is no current user registered with the email ${query.email}.`,
      );
    }

    if (possibleUsers.length > 1) {
      throw new Error(
        `Domain Validatio Error: There is more than one current user registered with the email ${query.email}.`,
      );
    }

    return possibleUsers[0];
  }
}

export default GetUserByEmailQueryHandler;
