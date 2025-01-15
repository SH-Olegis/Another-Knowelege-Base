import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UserCrudService } from '../../modules/user/user.crud.service';
import { COOKIE_ACCESS_TOKEN } from '../../config/constants';
import { ILoggedUser } from '../../interfaces/entities/user.interface';

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(Strategy, 'jwt-cookie') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userCrudService: UserCrudService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtCookieStrategy.parseCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'default_secret',
      passReqToCallback: true,
    });
  }

  static parseCookie(req: Request) {
    if (req.cookies && req.cookies[COOKIE_ACCESS_TOKEN]) {
      return req.cookies[COOKIE_ACCESS_TOKEN];
    }
    return null;
  }

  async validate(request: Request, payload: ILoggedUser) {
    const user = await this.userCrudService.findOne({
      email: payload.email,
    }, {
      id: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    });

    if (!user) throw new UnauthorizedException();
    
    return user
  }
}
