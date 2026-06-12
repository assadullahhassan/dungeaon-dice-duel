import express from 'express';
import { getDb } from '../db/db.js';
import bcrypt from 'bcrypt';
import session from 'express-session';
import validator from 'validator';

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ error: 'Name, username, and password are required.' });
  }

  name.trim();
  username.trim();
  const regex = /^[a-zA-Z0-9]+$/;

    if (!regex.test(username)) {
      return res.status(400).json({ error: 'Username can only contain letters and numbers.' });
    }

    if (validator.isEmpty(password) || !validator.isLength(password, { min: 6 })) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    try {
        const db = await getDb();
         const existingUser = await db.get(`SELECT * FROM users WHERE username = ?`, [username]);

        if (existingUser) {
          return res.status(400).json({ error: 'Username already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.run(
          `INSERT INTO users (name, username, password) VALUES (?, ?, ?)`,
          [name, username, hashedPassword]
        );
        res.status(201).json({ message: 'User registered successfully.' });
        req.session.userId = result.lastID;
        console.log('User registered with ID:', req.session.userId);

    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: 'Internal server error.' });
    } 

  

});

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const db = await getDb();
        const user = await db.get(`SELECT * FROM users WHERE username = ?`, [username]);

        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        req.session.userId = user.id;
        console.log('User logged in with ID:', req.session.userId);
        res.json({ message: 'Login successful.' });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: 'Internal server error.' });
    }
});

authRouter.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
        console.error("Error during logout:", err);
    }
    res.json({ message: 'Logout successful.' });
  });
});

export default authRouter;