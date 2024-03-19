import multer from 'multer'
import { Request, Response } from 'express';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

export const upload = multer({storage})

export default class UploadController {
  static async upload(req: Request, res: Response) {
    try{
      res.json({
        url: `/uploads/${req.file?.originalname}`
      })
    } catch (err) {
      res.json({
        msg: 'Ошибка',
        err: err
      })
    }
  }
}