import { Request, Response } from 'express';
import { pool } from '../database/db.js';

export default class CategoryController {
  static async createCategory(req: Request, res: Response) {
    const { image, title } = req.body;

    try {
      const result = await pool.query(
        'INSERT INTO categories (image, title) VALUES ($1, $2) RETURNING *',
        [image, title]
      );

      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({
        message: "Error adding category",
        error: err
      });
      console.error(err);
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    try {
      const review = await pool.query(
        'DELETE FROM categories WHERE id = $1',
        [req.params.id] // изменено на req.params.id для получения id из URL
      );
      res.json(review.rows[0]);
    } catch (err) {
      res.status(500).json({
        message: "Error deleting review",
        error: err
      });
      console.log(err);
    }
  }

  static async updateCategory(req: Request, res: Response) {
    try {
      const review = await pool.query(
        'UPDATE categories SET title = $1 WHERE id = $2',
        [req.body.title, req.body.id]
      )
      res.json(review.rows[0])
    } catch (err) {
      res.status(500).json({
        message: "Error deleting review",
        error: err
      });
      console.log(err)
    }
  }

  static async getAll (req: Request, res: Response) {
    try {
      const reviews = await pool.query(
        'SELECT * FROM categories'
      );

      if(reviews.rows.length == 0) {
        return res.status(404).json({
          message: 'Category list is empty. Try to add some items'
        });
      }

      res.json(reviews.rows);
    } catch (err) {
      res.status(500).json({
        message: "Error getting category list",
        error: err
      });
      console.log(err)
    }
  }
}