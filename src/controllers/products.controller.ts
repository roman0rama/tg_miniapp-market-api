import { Request, Response } from 'express';
import { pool } from '../database/db.js';

export default class ProductsController {
  static async createProduct(req: Request, res: Response) {
    try {
      const review = await pool.query(
        'INSERT INTO categories ( image, title ) VALUES ($1, $2) RETURNING *',
        [ req.body.name, req.body.cost ]
      )
      res.json(review)
    } catch (err) {
      res.status(500).json({
        message: "Error sending review",
        error: err
      });
      console.log(err)
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const review = await pool.query(
        'DELETE FROM categories WHERE id = $1',
        [req.body.id]
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

  static async updateProduct(req: Request, res: Response) {
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

  static async getProducts (req: Request, res: Response) {
    try {
      const products = await pool.query(
        'SELECT * FROM cards'
      );

      if(products.rows.length == 0) {
        return res.status(404).json({
          message: 'Product list is empty. Try to add some items'
        });
      }

      res.json(products.rows);
    } catch (err) {
      res.status(500).json({
        message: "Error getting products list",
        error: err
      });
      console.log(err)
    }
  }
}