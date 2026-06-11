import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import diceGameRoutes from './routes/diceGameRoutes.js';
import session from 'express-session';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use('/api', diceGameRoutes);

app.use(cors());
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});