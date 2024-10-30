import jwt from 'jsonwebtoken';
import { ITokenGenerator } from '../../core/interfaces/security/ITokenGenerator';
import { config } from '../../main/config/env';

export class JwtTokenGenerator implements ITokenGenerator {
  generate(payload: object): string {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '1d' });
  }

  verify(token: string): { userId?: string } | null {
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      return typeof decoded === 'object' ? decoded as { userId: string } : null;
    } catch (error) {
      return null;
    }
  }
}