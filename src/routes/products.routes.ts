import { Router, Request, Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import ProductController from '../controllers/products.controller.js';

export const productsRouter: Router = Router();

productsRouter.get('/products', async (req: Request, res: Response) => {
  await ProductController.getProducts(req, res);
});

/*
productsRouter.post('/products', async (req: Request, res: Response) => {
  await ProductController.createProduct(req, res);
});

productsRouter.put('/products', async (req: Request, res: Response) => {
  await ProductController.updateProduct(req, res);
});

productsRouter.delete('/products/:id', async (req: Request, res: Response) => {
  await ProductController.deleteProduct(req, res);
});

*/