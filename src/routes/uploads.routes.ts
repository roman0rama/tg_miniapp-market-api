import { Router, Request, Response } from 'express';
import UploadController, { upload } from '../controllers/upload.controller.js';

export const uploadsRouter: Router = Router();

uploadsRouter.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
  await UploadController.upload(req, res);
});