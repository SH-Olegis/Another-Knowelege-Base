import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { UserCrudService } from '../../modules/user/user.crud.service';
import { HashingService } from '../../modules/utils/iam/hashing.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userCrudService: UserCrudService,
    private hashingService: HashingService,
  ) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(request: Request, email: string, checkPassword: string) {
    const user = await this.userCrudService.findOne({ email }, {
      id: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      password: true,
    });

    if (!user) {
      throw new HttpException('Неправильный логин или пароль', HttpStatus.UNAUTHORIZED);
    }

    const passed = await this.hashingService.compare(checkPassword, user?.password);

    if (!passed) {
      throw new HttpException('Неправильный логин или пароль', HttpStatus.UNAUTHORIZED);
    }

    const {password, ...restUser} = user

    return restUser
  }
}
