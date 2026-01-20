import dotenv from "dotenv";
dotenv.config();
import express from "express";
import fs from "fs";
import path from "path";
import "./cron/dailyBackup.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure backups folder exists
const backupsPath = path.join(process.cwd(), "backups");
if (!fs.existsSync(backupsPath)) {
  fs.mkdirSync(backupsPath);
}

// Health check
app.get("/", (req, res) => {
  res.send("✅ MongoDB Backup Web Service Running");
});

// Manual backup trigger
app.post("/backup", async (req, res) => {
  if (req.headers.authorization !== `Bearer ${process.env.BACKUP_TOKEN}`) {
    return res.status(401).send("Unauthorized");
  }

  try {
    await global.runBackup();
    res.json({ success: true, message: "Backup triggered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backup service running on port ${PORT}`);
});
