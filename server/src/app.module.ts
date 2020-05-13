import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const rootPath = join(__dirname, '..', 'client');
const databaseUrl = process.env.DATABASE_URL;

console.log('DATABASE_URL', databaseUrl);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: rootPath,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
