import { Router } from 'express';
import { UserControllers } from '../controllers/users.controller.js';

const usersController = new UserControllers();
const router = Router();

router.get('/mockingusers', usersController.createUsersMock);


export default router;