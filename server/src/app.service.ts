import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const databaseUrl = process.env.DATABASE_URl || 'undefined';
    return databaseUrl;
  }
}
