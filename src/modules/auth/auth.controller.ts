import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express'
import { CreateUserDto } from '../user/dto/create-user.dto';
import { COOKIE_ACCESS_TOKEN } from '../../config/constants';
import { CurrentUser } from '../../decorators/user.decorator';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { ILoggedUser } from '../../interfaces/entities/user.interface';
import * as dayjs from 'dayjs'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
      @Res({ passthrough: true }) response: Response,
      @CurrentUser() user: ILoggedUser,
  ) {
    const {access_token} = await this.authService.login(user)
    const expires = dayjs().add(1, 'months').toDate();

    response
      .cookie(COOKIE_ACCESS_TOKEN, access_token, {
          httpOnly: true,
          expires: expires
        })
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    await this.authService.register(body.email, body.password);

    return 'Пользователь успешно создан'
  }
}
