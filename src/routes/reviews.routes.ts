import { Router, Request, Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import ReviewsController from '../controllers/reviews.controller.js';

export const reviewRouter: Router = Router();

reviewRouter.get('/reviews', async (req: Request, res: Response) => {
  await ReviewsController.getAll(req, res);
});

reviewRouter.post('/reviews', async (req: Request, res: Response) => {
  await ReviewsController.createReview(req, res);
});

reviewRouter.delete('/reviews/:id', async (req: Request, res: Response) => {
  await ReviewsController.deleteReview(req, res);
});