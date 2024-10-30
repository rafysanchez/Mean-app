import { CreateUserUseCase } from '../../../core/usecases/CreateUserUseCase';
import { MongoUserRepository } from '../../../infrastructure/database/mongoose/repositories/MongoUserRepository';
import { BcryptHasher } from '../../../infrastructure/security/BcryptHasher';

export function makeCreateUserUseCase(): CreateUserUseCase {
  const userRepository = new MongoUserRepository();
  const hasher = new BcryptHasher();
  return new CreateUserUseCase(userRepository, hasher);
}