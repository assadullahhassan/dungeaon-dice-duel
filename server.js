import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import gameRouter from './routes/diceGameRoutes.js';
import session from 'express-session';
import meRouter from './routes/me.js';
import authRouter from './routes/auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }
}));

app.use('/api', gameRouter);
app.use('/api/auth', authRouter);
app.use('/api/auth/me', meRouter);

app.use(cors());
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});