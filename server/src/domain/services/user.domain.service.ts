import { Injectable } from '@nestjs/common';

import UserRepository from '../../database/repositories/user.repository';
import UserDomainEntity from '../entities/user.entity';

@Injectable()
class UserDomainService {
  constructor(private readonly _userRepository: UserRepository) {}

  public async create(email: string): Promise<void> {
    const domainEntity = UserDomainEntity.create(email);

    const emailIsUnique = await this.emailIsUnique(email, null);
    if (emailIsUnique === false) {
      throw new Error(
        `Domain Validation Error: The email, ${email}, is already in use by another user.`,
      );
    }

    await this._userRepository.create(domainEntity);
  }

  public async update(email: string, id: string): Promise<void> {
    const domainEntity = UserDomainEntity.update(email, id);

    const emailIsUnique = await this.emailIsUnique(email, id);

    if (emailIsUnique === false) {
      throw new Error(
        `Domain Validation Error: The email, ${email}, is already in use by another user.`,
      );
    }

    return this._userRepository.update(domainEntity);
  }

  public async delete(id: string): Promise<void> {
    const possibleUser = await this._userRepository.readById(id);

    if (possibleUser === null) {
      throw new Error(
        `Domain Validation Error: The id, ${id}, is not a valid id for a current user.`,
      );
    }

    const domainEntity = UserDomainEntity.readFromDatabase(
      possibleUser.email,
      possibleUser.id,
    );

    return await this._userRepository.delete(domainEntity);
  }

  private async emailIsUnique(email: string, id: string): Promise<boolean> {
    const possibleUsers = await this._userRepository.readByEmail(email);

    if (possibleUsers === null) {
      return true;
    }

    const currentUserIsOnlyPossibleUser = possibleUsers.every(x => x.id === id);

    if (currentUserIsOnlyPossibleUser === true) {
      return true;
    }

    return false;
  }
}

export default UserDomainService;
