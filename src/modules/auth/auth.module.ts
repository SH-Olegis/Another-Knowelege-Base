import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UtilsModule } from '../utils/utils.module';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../guards/strategy/local.strategy';
import { JwtCookieStrategy } from '../../guards/strategy/jwt-cookie.strategy';

@Module({
  imports: [
    UtilsModule,
      UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('JWT_SECRET') || 'default_secret',
          signOptions: { expiresIn: '1h' },
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtCookieStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
