import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Guard из jwt-cookie.strategy.ts
@Injectable()
export class JwtCookieAuthGuard extends AuthGuard('jwt-cookie') {}
