import { Injectable } from '@nestjs/common';
import { UserCrudService } from './user.crud.service';

@Injectable()
export class UserService {
  constructor(private readonly userCrudService: UserCrudService) {}

  public async getUserById(id: number) {
    return this.userCrudService.findOne({ id });
  }

  public async getUsers() {
    return this.userCrudService.findMany({});
  }
}
