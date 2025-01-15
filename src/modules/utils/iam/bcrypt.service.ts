import { HashingService } from './hashing.service';
import * as bcryptjs from 'bcryptjs';

export class BcryptService implements HashingService {
  compare(data: string, encrypted: string): Promise<boolean> {
    return bcryptjs.compare(data, encrypted);
  }

  async hash(data: string): Promise<string> {
    const salt = await bcryptjs.genSalt();
    return bcryptjs.hash(data, salt);
  }
}
