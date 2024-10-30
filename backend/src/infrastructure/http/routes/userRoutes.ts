import { Router } from 'express';
import { makeUserController } from '../../../main/factories/controllers/makeUserController';

const userRoutes = Router();
const userController = makeUserController();

userRoutes.post('/', (req, res) => userController.create(req, res));

// Add other routes...

export { userRoutes };