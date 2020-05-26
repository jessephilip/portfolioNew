import { DocumentData } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';

import NoteDomainEntity from '../../domain/entities/note.entity';
import DatabaseConnection from '../connection';

@Injectable()
class NoteRepository {
  /**
   * create
   */
  public async create(entity: NoteDomainEntity) {
    const connection = DatabaseConnection;

    const data: DocumentData = {
      userId: entity.userId,
      text: entity.text,
    };

    const add$ = from(connection.collection('notes').add(data));
  }
}

export default NoteRepository;
