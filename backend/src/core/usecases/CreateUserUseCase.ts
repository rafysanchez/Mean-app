import { User } from '../entities/User';
import { IUserRepository } from '../interfaces/repositories/IUserRepository';
import { IHasher } from '../interfaces/security/IHasher';

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hasher: IHasher
  ) {}

  async execute(userData: Omit<User, 'id'>): Promise<User> {
    const hashedPassword = await this.hasher.hash(userData.password);
    const user = new User(
      Date.now().toString(),
      userData.name,
      userData.email,
      hashedPassword
    );
    return this.userRepository.create(user);
  }
}