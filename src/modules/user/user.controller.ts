import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtCookieAuthGuard } from '../../guards/jwt-cookie-auth.guard';

@UseGuards(JwtCookieAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  @Get()
  async listUsers() {
    return this.usersService.getUsers();
  }
}
