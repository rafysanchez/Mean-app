import { CreateUserUseCase } from '../../../../src/core/usecases/CreateUserUseCase';
import { IUserRepository } from '../../../../src/core/interfaces/repositories/IUserRepository';
import { IHasher } from '../../../../src/core/interfaces/security/IHasher';
import { User } from '../../../../src/core/entities/User';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockHasher: jest.Mocked<IHasher>;

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    mockHasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    };
    createUserUseCase = new CreateUserUseCase(mockUserRepository, mockHasher);
  });

  it('should create a user with hashed password', async () => {
    const userData = { name: 'Test User', email: 'test@example.com', password: 'password123' };
    const hashedPassword = 'hashedPassword123';
    const createdUser = new User('1', userData.name, userData.email, hashedPassword);

    mockHasher.hash.mockResolvedValue(hashedPassword);
    mockUserRepository.create.mockResolvedValue(createdUser);

    const result = await createUserUseCase.execute(userData);

    expect(mockHasher.hash).toHaveBeenCalledWith(userData.password);
    expect(mockUserRepository.create).toHaveBeenCalledWith(expect.any(User));
    expect(result).toEqual(createdUser);
  });
});