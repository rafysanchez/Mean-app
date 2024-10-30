import { AuthController } from '../../../../../src/infrastructure/http/controllers/AuthController';
import { AuthenticateUserUseCase } from '../../../../../src/core/usecases/AuthenticateUserUseCase';

describe('AuthController', () => {
  let authController: AuthController;
  let mockAuthenticateUserUseCase: jest.Mocked<AuthenticateUserUseCase>;
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    mockAuthenticateUserUseCase = {
      execute: jest.fn(),
    } as any;

    authController = new AuthController(mockAuthenticateUserUseCase);

    mockRequest = {
      body: {},
    };

    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should return a token on successful login', async () => {
    mockRequest.body = { email: 'test@example.com', password: 'password123' };
    mockAuthenticateUserUseCase.execute.mockResolvedValue('generated-token');

    await authController.login(mockRequest, mockResponse);

    expect(mockAuthenticateUserUseCase.execute).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(mockResponse.json).toHaveBeenCalledWith({ token: 'generated-token' });
  });

  it('should return 401 on invalid credentials', async () => {
    mockRequest.body = { email: 'test@example.com', password: 'wrongpassword' };
    mockAuthenticateUserUseCase.execute.mockResolvedValue(null);

    await authController.login(mockRequest, mockResponse);

    expect(mockAuthenticateUserUseCase.execute).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it('should return 500 on internal server error', async () => {
    mockRequest.body = { email: 'test@example.com', password: 'password123' };
    mockAuthenticateUserUseCase.execute.mockRejectedValue(new Error('Database error'));

    await authController.login(mockRequest, mockResponse);

    expect(mockAuthenticateUserUseCase.execute).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});