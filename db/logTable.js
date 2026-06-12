import { getDb } from "./db.js";

async function viewTable() {
  const db = await getDb();

    try {
        const heroes = await db.all(`SELECT * FROM runs`);
        console.log("Heroes in the database:");
        console.table(heroes);
    } catch (error) {
        console.error("Error viewing table:", error);
    } finally {
        await db.close();
        console.log("Database connection closed.");
    }
}

viewTable();