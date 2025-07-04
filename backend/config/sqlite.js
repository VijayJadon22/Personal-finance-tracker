import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Required for ESM __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the 'data' folder exists
const dataDir = path.join(__dirname, "../data");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// SQLite DB path
const dbPath = path.join(dataDir, "reports.db");
const db = new Database(dbPath);

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS monthly_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT,
    month TEXT,
    totalSpent REAL,
    topCategory TEXT,
    overbudgetCategories TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
