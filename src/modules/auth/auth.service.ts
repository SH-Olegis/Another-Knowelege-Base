import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCrudService } from '../user/user.crud.service';
import { HashingService } from '../utils/iam/hashing.service';
import { ILoggedUser } from '../../interfaces/entities/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly userCrudService: UserCrudService
  ) {}

  public async register(email: string, password: string) {
    const hashedPassword = await this.hashingService.hash(password);

    return this.userCrudService.create({
      email: email,
      password: hashedPassword,
    })
  }

  public async login(user: ILoggedUser) {
    const token = this.jwtService.sign(user);

    return { access_token: token };
  }
}
