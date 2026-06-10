import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import diceGameRoutes from './routes/diceGameRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/api', diceGameRoutes);

app.use(cors());
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});