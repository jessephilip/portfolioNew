import { ConfigService } from '@nestjs/config';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import LoginQuery from './login.query';

@QueryHandler(LoginQuery)
class LoginQueryHandler implements IQueryHandler<LoginQuery> {
  constructor(private configService: ConfigService) {}

  public async execute(query: LoginQuery) {
    if (query.password === this.configService.get('MASTER_CLIENT_PASSWORD')) {
      return true;
    }
  }
}

export default LoginQueryHandler;
