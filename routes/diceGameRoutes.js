import express from 'express';
import { createDiceGameEngine } from '../domain/diceGameEngine.js'
import { getAllHeroes } from '../db/heroes.js';
import { createRun, updateRunStats } from '../db/runs.js';

const heroes = await getAllHeroes();

const engine = createDiceGameEngine(heroes);

const gameRouter = express.Router();

gameRouter.get('/heroes', (req, res) => {
  const heroes = engine.getHeroes();
  console.log('Fetched heroes:', heroes);
  res.json(heroes);
});

gameRouter.post('/battle/start', (req, res) => {
  const { playerHeroId } = req.body;
  const result = engine.startBattle(playerHeroId);
  res.json(result);

  if(req.session.userId) {
    const runId = createRun(req.session.userId);
    req.session.runId = runId;
  }
});

gameRouter.post('/battle/round', (req, res) => {
  const result = engine.playRound();
  res.json(result);

  if(result.outcome === 'ongoing') {
    // updateRunStats(req.session.runId);
  }
});

gameRouter.post('/battle/reset', (req, res) => {
  engine.resetBattle();
  res.json({ message: 'Battle reset.' });
});



export default gameRouter;

