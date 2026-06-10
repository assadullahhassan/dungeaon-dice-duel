import { getDb } from './db.js';

async function createTable() {
  const db = await getDb();

  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS heroes (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        attackPower INTEGER,
        defensePower INTEGER,
        maxHp INTEGER,
        imageUrl TEXT
      )
    `);
    console.log("Table created successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    await db.close();
    console.log("Database connection closed.");
  }
}

createTable();