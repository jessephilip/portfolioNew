import { Module } from '@nestjs/common';

import NoteRepository from './repositories/note.repository';
import UserRepository from './repositories/user.repository';

@Module({
  controllers: [],
  providers: [UserRepository, NoteRepository],
  exports: [UserRepository, NoteRepository],
})
export class DatabaseModule {}
