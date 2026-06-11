import { getDb } from '../db/db.js';
import express from 'express';
import session from 'express-session';


const meRouter = express.Router();

meRouter.get('/', async (req, res) => {
    const db = await getDb();
    
  if (!req.session.userId) {
    return res.status(401).json({ isLoggedIn: false });
  }

const user = await db.get('SELECT name FROM users WHERE id = ?', [req.session.userId])

res.json({ isLoggedIn: true, name: user.name})

});

export default meRouter;