import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const rootPath = join(__dirname, '..', 'client');

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: rootPath,
    }),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
