import { IUserRepository } from '../interfaces/repositories/IUserRepository';
import { IHasher } from '../interfaces/security/IHasher';
import { ITokenGenerator } from '../interfaces/security/ITokenGenerator';

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hasher: IHasher,
    private tokenGenerator: ITokenGenerator
  ) {}

  async execute(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    const isPasswordValid = await this.hasher.compare(password, user.password);
    if (!isPasswordValid) return null;

    return this.tokenGenerator.generate({ userId: user.id });
  }
}