import { getDb } from './db.js';

async function createTable() {
  const db = await getDb();

  try {
    await db.exec(
      runsTable()
      // heroTable()
      // usersTable()
      // deleteRunsTable()
    )
    console.log("Table created successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    await db.close();
    console.log("Database connection closed.");
  }
}

function heroTable() {
  return `CREATE TABLE IF NOT EXISTS heroes (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    attackPower INTEGER NOT NULL,
    defensePower INTEGER NOT NULL,
    maxHp INTEGER NOT NULL,
    imageUrl TEXT NOT NULL
  )`;
}

function runsTable() {
  return `CREATE TABLE IF NOT EXISTS runs (
    id INTEGER PRIMARY KEY,
    userId INTEGER NOT NULL DEFAULT 0,
    total_battles INTEGER NOT NULL DEFAULT 0,
    wins INTEGER NOT NULL DEFAULT 0,
    losses INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`;
}

function usersTable() {
  return `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`;
}

function deleteRunsTable() {
  return `DROP TABLE IF EXISTS runs`;
}

createTable();