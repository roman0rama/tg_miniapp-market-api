import { Request, Response } from 'express';
import { pool } from '../database/db.js';

export default class ReviewsController {

  static async createReview(req: Request, res: Response) {
    try {
      const review = await pool.query(
        'INSERT INTO reviews (personid, cardid, publishedat, cost) VALUES ($1, $2, $3) RETURNING *',
        [req.body.person_id, req.body.name, req.body.cost]
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

  static async deleteReview(req: Request, res: Response) {
    try {
      const review = await pool.query(
        'DELETE FROM reviews WHERE id = $1',
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

  /*
  static async getCardReviews (req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await pool.query(
        'SELECT * FROM person WHERE id = $1',
        [id]
      );

      if(user.rows.length == 0) {
        return res.status(404).json({
          message: 'Пользователь не найден.'
        });
      }

      res.json(user.rows[0]);
    } catch (err) {
      res.status(500).json({
        message: "Не удалось получить данные о пользователе",
        error: err
      });
      console.log(err)
    }
  }
  */

  static async getAll (req: Request, res: Response) {
    try {
      const reviews = await pool.query(
        'SELECT * FROM reviews'
      );

      if(reviews.rows.length == 0) {
        return res.status(404).json({
          message: 'Review list is empty. Try to add some items'
        });
      }

      res.json(reviews.rows);
    } catch (err) {
      res.status(500).json({
        message: "Error getting reviews",
        error: err
      });
      console.log(err)
    }
  }
}