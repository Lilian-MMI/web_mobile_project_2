import {
  registerUser,
  loginUser,
  getCurrentUser,
  editCurrentUser,
} from './../controllers/user.controller';
import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware';

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', verifyToken, getCurrentUser);
userRouter.put('/me', verifyToken, editCurrentUser);

export default userRouter;
