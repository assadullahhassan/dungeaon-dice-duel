import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path';

export async function getDb() {
  return open({
    filename: path.join(process.cwd(), 'db', 'database.db'),
    driver: sqlite3.Database
  });
}