import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Load env variables
dotenv.config();

// Ensure backups folder exists
const backupsPath = path.join(process.cwd(), "backups");
if (!fs.existsSync(backupsPath)) {
  fs.mkdirSync(backupsPath);
}

// Start cron job
import "./cron/dailyBackup.js";

console.log("🚀 MongoDB Backup Server Started");
console.log("📦 Daily backups → Google Drive enabled");
