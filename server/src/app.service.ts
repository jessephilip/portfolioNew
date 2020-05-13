import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    const withoutProcessEnv = this.configService.get('DATABASE_URL');
    const databaseUrl = this.configService.get('process.env.DATABASE_URL');

    if (withoutProcessEnv) {
      return `without ${withoutProcessEnv}`;
    }

    if (databaseUrl) {
      return `with ${databaseUrl}`;
    }

    return 'undefined';
  }
}
