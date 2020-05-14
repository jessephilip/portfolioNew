import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import LoginRequest from './requests/login.request';

@Controller('login')
export class LoginController {
  constructor(private configService: ConfigService) {}
  @Post()
  @HttpCode(200)
  public authenticate(@Body() request: LoginRequest): boolean {
    if (request.password === this.configService.get('MASTER_CLIENT_PASSWORD')) {
      return true;
    }
  }
}
