import express from 'express';
import { createDiceGameEngine } from '../domain/diceGameEngine.js'
import { getAllHeroes } from '../db/heroes.js';
import { createRun, updateRunStats } from '../db/runs.js';

const heroes = await getAllHeroes();

const engine = createDiceGameEngine(heroes);

const gameRouter = express.Router();

gameRouter.get('/heroes', (req, res) => {
  const heroes = engine.getHeroes();
  res.json(heroes);
});

gameRouter.post('/battle/start', async (req, res) => {
  const { heroId } = req.body;
  const result = engine.startBattle(heroId);
  

  if(req.session.userId) {
    const runId = await createRun(req.session.userId);
    req.session.runId = runId;
    console.log('New run created with ID:', runId);
    console.log('RunId stored in session:', req.session.runId);
  }
  res.json(result);
});

gameRouter.post('/battle/round',  (req, res) => {
  const result = engine.playRound();

  console.log('Result of round:', result);
  console.log('runId in session:', req.session.userId, req.session.runId);
  console.log('Battle outcome:', result.outcome, 'Total battles:', result.totalBattles, 'Wins:', result.wins, 'Losses:', result.losses);
  if(result.outcome === 'ongoing') {
    // updateRunStats(req.session.runId,);
    console.log('RunId:', req.session.runId, result.outcome);
  }
  res.json(result);
});

gameRouter.post('/battle/reset', (req, res) => {
  engine.resetBattle();
  res.json({ message: 'Battle reset.' });
});



export default gameRouter;

