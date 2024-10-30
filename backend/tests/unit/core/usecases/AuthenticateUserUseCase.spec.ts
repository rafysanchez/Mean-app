import { AuthenticateUserUseCase } from '../../../../src/core/usecases/AuthenticateUserUseCase';
import { IUserRepository } from '../../../../src/core/interfaces/repositories/IUserRepository';
import { IHasher } from '../../../../src/core/interfaces/security/IHasher';
import { ITokenGenerator } from '../../../../src/core/interfaces/security/ITokenGenerator';
import { User } from '../../../../src/core/entities/User';

describe('AuthenticateUserUseCase', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockHasher: jest.Mocked<IHasher>;
  let mockTokenGenerator: jest.Mocked<ITokenGenerator>;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
    } as any;
    mockHasher = {
      compare: jest.fn(),
    } as any;
    mockTokenGenerator = {
      generate: jest.fn(),
    } as any;

    authenticateUserUseCase = new AuthenticateUserUseCase(
      mockUserRepository,
      mockHasher,
      mockTokenGenerator
    );
  });

  it('should authenticate a user and return a token', async () => {
    const user = new User('1', 'Test User', 'test@example.com', 'hashedPassword');
    mockUserRepository.findByEmail.mockResolvedValue(user);
    mockHasher.compare.mockResolvedValue(true);
    mockTokenGenerator.generate.mockReturnValue('generated-token');

    const result = await authenticateUserUseCase.execute('test@example.com', 'password123');

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(mockHasher.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(mockTokenGenerator.generate).toHaveBeenCalledWith({ userId: '1' });
    expect(result).toBe('generated-token');
  });

  it('should return null for non-existent user', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const result = await authenticateUserUseCase.execute('nonexistent@example.com', 'password123');

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('nonexistent@example.com');
    expect(result).toBeNull();
  });

  it('should return null for incorrect password', async () => {
    const user = new User('1', 'Test User', 'test@example.com', 'hashedPassword');
    mockUserRepository.findByEmail.mockResolvedValue(user);
    mockHasher.compare.mockResolvedValue(false);

    const result = await authenticateUserUseCase.execute('test@example.com', 'wrongpassword');

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(mockHasher.compare).toHaveBeenCalledWith('wrongpassword', 'hashedPassword');
    expect(result).toBeNull();
  });
});