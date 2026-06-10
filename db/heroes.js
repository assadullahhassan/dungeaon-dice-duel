import { getDb } from "./db.js";

export async function getAllHeroes() {
  const db = await getDb();
    try {
        const heroes = await db.all(`SELECT * FROM heroes`);
        return heroes;
    } catch (error) {
        console.error("Error fetching heroes:", error);
        return [];
    } finally {
        await db.close();
    }
}