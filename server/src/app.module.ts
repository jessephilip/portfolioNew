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
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
