import { Body, Controller, Delete, HttpCode, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import DeleteUserCommand from './commands/delete-user.command';
import RegisterCommand from './commands/register.command';
import UpdateUserCommand from './commands/update-user.command';
import GetUserByEmailQuery from './queries/get-user-by-email.query';
import LoginQuery from './queries/login.query';
import LoginRequest from './requests/login.request';
import RegisterRequest from './requests/register.request';
import UpdateUserRequest from './requests/update-user.request';

@Controller('auth')
export class AuthController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post('login')
  @HttpCode(200)
  public async authenticate(@Body() request: LoginRequest): Promise<boolean> {
    const query = new LoginQuery(request.password);
    return await this.queryBus.execute(query);
  }

  @Post()
  public async register(@Body() request: RegisterRequest): Promise<string> {
    const command = new RegisterCommand(request.email);
    await this.commandBus.execute(command);

    const query = new GetUserByEmailQuery(request.email);
    const user = await this.queryBus.execute(query);
    return user.id;
  }

  @Put()
  public async updateUser(@Body() request: UpdateUserRequest): Promise<void> {
    const command = new UpdateUserCommand(request.id, request.email);
    return await this.commandBus.execute(command);
  }

  @Delete()
  public async deleteUser(@Query('id') id: string): Promise<void> {
    const command = new DeleteUserCommand(id);
    return await this.commandBus.execute(command);
  }
}
