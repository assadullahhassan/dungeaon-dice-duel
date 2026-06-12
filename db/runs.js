import { getDb } from './db.js';

async function createRun(userId) {
  const db = await getDb();

  try {
    const result = await db.run(
      `INSERT INTO runs (userId, created_at) VALUES (?, ?)`,
      [userId, new Date().toISOString()]
    );
    console.log('Run created with ID:', result);
    return await result.lastID;

  } catch (error) {
    console.error("Error creating run:", error);
  } finally {
    await db.close();
    console.log("Database connection closed.");
  }
}

async function updateRunStats(runId, totalBattles, wins, losses) {
  const db = await getDb();

  try {
    await db.run(
      `UPDATE runs SET total_battles = ?, wins = ?, losses = ? WHERE id = ?`,
      [totalBattles, wins, losses, runId]
    );
  } catch (error) {
    console.error("Error updating run stats:", error);
  } finally {
    await db.close();
    console.log("Database connection closed.");
  }
}

export { createRun, updateRunStats };