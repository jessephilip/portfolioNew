import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { WeatherModule } from './weather/weather.module';

const rootPath = join(__dirname, '..', 'client');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: rootPath,
    }),
    AuthModule,
    WeatherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
