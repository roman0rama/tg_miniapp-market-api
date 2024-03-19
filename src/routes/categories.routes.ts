import { Router, Request, Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import CategoryController from '../controllers/category.controller.js';

export const categoryRouter: Router = Router();

categoryRouter.get('/category', async (req: Request, res: Response) => {
  await CategoryController.getAll(req, res);
});

categoryRouter.post('/category', async (req: Request, res: Response) => {
  await CategoryController.createCategory(req, res);
});

categoryRouter.delete('/category/:id', async (req: Request, res: Response) => {
  await CategoryController.deleteCategory(req, res);
});

categoryRouter.put('/category', async (req: Request, res: Response) => {
  await CategoryController.updateCategory(req, res);
});