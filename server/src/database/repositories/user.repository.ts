import { DocumentData, FieldValue } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';

import UserDomainEntity from '../../domain/entities/user.entity';
import DatabaseConnection from '../connection';

export interface UserDTO {
  id: string;
  email: string;
}

const tableName = 'users';

@Injectable()
class UserRepository {
  public async create(entity: UserDomainEntity): Promise<void> {
    const connection = DatabaseConnection;

    const data: DocumentData = {
      email: entity.email,
      timestamp: FieldValue.serverTimestamp(),
    };

    await connection.collection(tableName).add(data);
  }

  public async readById(id: string): Promise<UserDTO | null> {
    const connection = DatabaseConnection;

    const possibleUser = await connection
      .collection(tableName)
      .doc(id)
      .get();

    if (possibleUser.exists === false) {
      return null;
    }

    const userDTO: UserDTO = {
      id,
      email: possibleUser.get('email'),
    };

    return userDTO;
  }

  public async readByEmail(email: string): Promise<UserDTO[] | null> {
    const connection = DatabaseConnection;

    const possibleUsers = await connection
      .collection(tableName)
      .where('email', '==', email)
      .get();

    if (possibleUsers.empty) {
      return null;
    }

    const userDTOs = possibleUsers.docs.map(x => {
      const userDTO: UserDTO = {
        id: x.id,
        email: x.get('email'),
      };

      return userDTO;
    });

    return userDTOs;
  }

  public async update(entity: UserDomainEntity): Promise<void> {
    const connection = DatabaseConnection;

    const data: DocumentData = {
      email: entity.email,
      timestamp: FieldValue.serverTimestamp(),
    };

    await connection
      .collection(tableName)
      .doc(entity.id)
      .update(data);
  }

  public async delete(entity: UserDomainEntity): Promise<void> {
    const connection = DatabaseConnection;

    const user = await connection
      .collection(tableName)
      .doc(entity.id)
      .get();

    await user.ref.delete();
  }
}

export default UserRepository;
