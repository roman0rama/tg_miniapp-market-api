import { Router, Request, Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import UserController from '../controllers/user.controller.js';

export const userRouter: Router = Router();

userRouter.get('/users', async (req: Request, res: Response) => {
  await UserController.getUsers(req, res);
});

userRouter.get('/users/:id', async (req: Request, res: Response) => {
  await UserController.getOneUser(req, res);
});

userRouter.post('/users/isValid', async (req: Request, res: Response) => {
  await UserController.checkValidUser(req, res);
});

userRouter.post('/auth', async (req: Request, res: Response) => {
  await UserController.Auth(req, res);
});

userRouter.post('/user', async (req: Request, res: Response) => {
  await UserController.createUser(req, res);
});

userRouter.put('/user', async (req: Request, res: Response) => {
  await UserController.updateUser(req, res);
});

userRouter.delete('/user/:id', async (req: Request, res: Response) => {
  await UserController.deleteUser(req, res);
});

