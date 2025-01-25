import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import removeProperties from 'src/utils/removeProperties';
import { CustomRequest } from 'src/utils/customRequest';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.userService.users({});
    const usersWithoutPassword = users.map((user) =>
      removeProperties(user, 'password'),
    );
    return usersWithoutPassword;
  }

  @Get('me')
  async findMe(@Request() req: CustomRequest) {
    const user = await this.userService.user({
      id: req.user.id,
    });
    return removeProperties(user as User, 'password');
  }
}
