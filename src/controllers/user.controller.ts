import { Request, Response } from 'express';
import { pool } from '../database/db.js';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

export default class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const user = await pool.query(
        'INSERT INTO person (id, login, passwordhash, fullname) ' +
        'VALUES ($1, NULL, NULL, NULL) RETURNING *',
        [userId]
      );
      res.json(user)
    } catch (err) {
      res.status(500).json({
        message: "Error creating user",
        error: err
      });
      console.log(err)
    }
  }

  static async checkValidUser(req: Request, res: Response) {
    try {
      const { userId, fullName } = req.body;

      const selectedUser = await pool.query('SELECT id FROM person WHERE id = $1', [userId]);

      if (selectedUser.rowCount === 0) {
        const user = await pool.query(
          'INSERT INTO person (id, login, passwordhash, fullname) ' +
          'VALUES ($1, NULL, NULL, $2) RETURNING *',
          [userId, fullName]
        );
        res.json(user.rows[0].id);
      } else {
        res.json(selectedUser.rows[0].id);
      }
    } catch (err) {
      res.status(500).json({
        message: "Error validating user",
        error: err
      });
      console.error(err);
    }
  }


  static async updateUser (req: Request, res: Response) {
    try {
      const { login, password, fullname } = req.body;
      const user = await pool.query(
        'UPDATE person set passwordhash = $1, fullname = $2 where login = $3 RETURNING *',
        [password, fullname, login]
      );

      res.json(user.rows[0]);
    } catch (err) {
      res.status(500).json({
        message: "Error updating user item",
        error: err
      });
      console.log(err)
    }
  }

  static async getOneUser (req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await pool.query(
        'SELECT * FROM person WHERE id = $1',
        [id]
      );

      if(user.rows.length == 0) {
        return res.status(404).json({
          message: 'User not found.'
        });
      }

      res.json(user.rows[0]);
    } catch (err) {
      res.status(500).json({
        message: "Error getting user data",
        error: err
      });
      console.log(err)
    }
  }

  static async deleteUser (req: Request, res: Response) {
    try {
      const id = req.body.id;
      const user = await pool.query(
        'DELETE FROM person WHERE id = $1',
        [id]
      );

      res.json(user.rows[0]);
    } catch (err) {
      res.status(500).json({
        message: "Error deleting user item",
        error: err
      });
      console.log(err)
    }
  }

  static async getUsers (req: Request, res: Response) {
    try {
      const users = await pool.query(
        'SELECT * FROM person'
      );

      if(users.rows.length == 0) {
        return res.status(404).json({
          message: 'User list is empty. Try to add some items'
        });
      }

      res.json(users.rows);
    } catch (err) {
      res.status(500).json({
        message: "Error getting user list",
        error: err
      });
      console.log(err)
    }
  }

  static async Auth (req: Request, res: Response) {
    try {
      const { login, password } = req.body
      const user = await pool.query('SELECT * FROM person WHERE login = $1', [login])

      if(user.rows.length == 0) {
        return res.status(200).json({
          message: 'User not found.'
        });
      }

      const isValidPass = await bcrypt.compare(`${password}`, `${user.rows[0].passwordhash}`);

      if(!isValidPass) {
        return res.status(400).json({
          message: 'Invalid login or password.'
        });
      }

      const token = jwt.sign({
        _id: user.rows[0].id
      }, `${process.env.BCRYPT_SECRET_KEY}`, {
        expiresIn: '30d'
      });

      const { passwordhash, ...userData } = user.rows[0];

      res.json({
        ...userData,
        bearer: token
      })
    } catch (err) {
      res.status(500).json({
        message: "Auth error",
        error: err
      });
      console.log(err)
    }
  }
}