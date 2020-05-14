import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';

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
      type: 'postgres',
      url: databaseUrl,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
