import { getDb } from "./db.js";
import { heroes } from "../data/heroes.js";

async function seedTable() {
  const db = await getDb();

  try {
    await db.exec(`BEGIN TRANSACTION`);
    for (const hero of heroes) {
      const { id, name, attackPower, defensePower, maxHp, imageUrl } = hero;
      await db.run(
        `INSERT INTO heroes (id, name, attackPower, defensePower, maxHp, imageUrl)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, name, attackPower, defensePower, maxHp, imageUrl]
      );
    }
    await db.exec(`COMMIT`);
    console.log("Table seeded successfully.");
  } catch (error) {
    console.error("Error seeding table:", error);
    await db.exec(`ROLLBACK`);
  } finally {
    await db.close();
    console.log("Database connection closed.");
  }
    
}

seedTable();