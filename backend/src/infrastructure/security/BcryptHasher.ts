import bcrypt from 'bcrypt';
import { IHasher } from '../../core/interfaces/security/IHasher';

export class BcryptHasher implements IHasher {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}