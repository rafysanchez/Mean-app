@REM mkdir  backend/src/config
@REM mkdir  backend/src/core/entities
@REM mkdir  backend/src/core/interfaces/repositories
@REM mkdir  backend/src/core/interfaces/security
@REM mkdir  backend/src/core/usecases
@REM mkdir  backend/src/infrastructure/database/mongoose/models
@REM mkdir  backend/src/infrastructure/database/mongoose/repositories
@REM mkdir  backend/src/infrastructure/http/controllers
@REM mkdir  backend/src/infrastructure/http/middlewares
@REM mkdir  backend/src/infrastructure/http/routes
@REM mkdir  backend/src/infrastructure/security
@REM mkdir  backend/src/main/factories/controllers
@REM mkdir  backend/src/main/factories/usecases
@REM mkdir  backend/src/main/config
@REM mkdir  backend/tests/unit/core/usecases
@REM mkdir  backend/tests/integration/routes


@echo off

REM Criando a estrutura de pastas
mkdir backend\src\config
mkdir backend\src\core\entities
mkdir backend\src\core\interfaces\repositories
mkdir backend\src\core\interfaces\security
mkdir backend\src\core\usecases
mkdir backend\src\infrastructure\database\mongoose\models
mkdir backend\src\infrastructure\database\mongoose\repositories
mkdir backend\src\infrastructure\http\controllers
mkdir backend\src\infrastructure\http\middlewares
mkdir backend\src\infrastructure\http\routes
mkdir backend\src\infrastructure\security
mkdir backend\src\main\factories\controllers
mkdir backend\src\main\factories\usecases
mkdir backend\src\main\config
mkdir backend\tests\unit\core\usecases
mkdir backend\tests\integration\routes

REM Criando arquivos vazios
type nul > backend\src\core\entities\User.ts
type nul > backend\src\core\interfaces\repositories\IUserRepository.ts
type nul > backend\src\core\interfaces\security\IHasher.ts
type nul > backend\src\core\interfaces\security\ITokenGenerator.ts
type nul > backend\src\core\usecases\CreateUserUseCase.ts
type nul > backend\src\core\usecases\AuthenticateUserUseCase.ts
type nul > backend\src\infrastructure\database\mongoose\models\UserModel.ts
type nul > backend\src\infrastructure\database\mongoose\repositories\MongoUserRepository.ts
type nul > backend\src\infrastructure\http\controllers\UserController.ts
type nul > backend\src\infrastructure\http\controllers\AuthController.ts
type nul > backend\src\infrastructure\http\middlewares\authMiddleware.ts
type nul > backend\src\infrastructure\http\routes\userRoutes.ts
type nul > backend\src\infrastructure\http\routes\authRoutes.ts
type nul > backend\src\infrastructure\security\BcryptHasher.ts
type nul > backend\src\infrastructure\security\JwtTokenGenerator.ts
type nul > backend\src\main\server.ts
type nul > backend\src\main\config\env.ts
type nul > backend\src\main\factories\controllers\makeUserController.ts
type nul > backend\src\main\factories\controllers\makeAuthController.ts
type nul > backend\src\main\factories\usecases\makeCreateUserUseCase.ts
type nul > backend\src\main\factories\usecases\makeAuthenticateUserUseCase.ts
type nul > backend\tests\unit\core\usecases\CreateUserUseCase.spec.ts
type nul > backend\tests\unit\core\usecases\AuthenticateUserUseCase.spec.ts
type nul > backend\tests\unit\infrastructure\http\controllers\UserController.spec.ts
type nul > backend\tests\unit\infrastructure\http\controllers\AuthController.spec.ts
type nul > backend\package.json
type nul > backend\tsconfig.json
type nul > backend\jest.config.js

echo Estrutura de pastas e arquivos criada com sucesso!