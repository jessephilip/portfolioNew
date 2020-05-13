import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const rootPath = join(__dirname, '..', 'client');
const databaseUrl = process.env.DATABASE_URL;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: rootPath,
    }),
    TypeOrmModule.forRoot({
      url: databaseUrl,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
