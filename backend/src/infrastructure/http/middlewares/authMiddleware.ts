import { Request, Response, NextFunction } from 'express';
import { ITokenGenerator } from '../../../core/interfaces/security/ITokenGenerator';

export function authMiddleware(tokenGenerator: ITokenGenerator) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      return res.status(401).json({ message: 'Token error' });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ message: 'Token malformatted' });
    }

    const payload = tokenGenerator.verify(token);
    if (!payload || !(payload as { userId: string }).userId) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    req.userId = (payload as { userId: string }).userId;
    next();
  };
}