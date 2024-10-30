import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from '../../../core/usecases/AuthenticateUserUseCase';

export class AuthController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const token = await this.authenticateUserUseCase.execute(email, password);
      if (token) {
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}