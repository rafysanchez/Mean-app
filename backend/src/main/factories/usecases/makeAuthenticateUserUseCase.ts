import { AuthenticateUserUseCase } from '../../../core/usecases/AuthenticateUserUseCase';
import { MongoUserRepository } from '../../../infrastructure/database/mongoose/repositories/MongoUserRepository';
import { BcryptHasher } from '../../../infrastructure/security/BcryptHasher';
import { JwtTokenGenerator } from '../../../infrastructure/security/JwtTokenGenerator';

export function makeAuthenticateUserUseCase(): AuthenticateUserUseCase {
  const userRepository = new MongoUserRepository();
  const hasher = new BcryptHasher();
  const tokenGenerator = new JwtTokenGenerator();
  return new AuthenticateUserUseCase(userRepository, hasher, tokenGenerator);
}