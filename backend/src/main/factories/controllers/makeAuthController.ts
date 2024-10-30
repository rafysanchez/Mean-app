import { UserController } from '../../../infrastructure/http/controllers/UserController';
import { makeCreateUserUseCase } from '../usecases/makeCreateUserUseCase';

export function makeUserController(): UserController {
  const createUserUseCase = makeCreateUserUseCase();
  return new UserController(createUserUseCase);
}