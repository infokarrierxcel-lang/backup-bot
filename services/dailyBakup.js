import cron from "node-cron";
import fs from "fs";
import path from "path";
import { backupMongoDB } from "../services/mongoBackup.js";
import { zipFolder } from "../services/zip.js";
import { uploadToDrive } from "../services/driveUpload.js";

cron.schedule("0 2 * * *", async () => {
  const timestamp = new Date().toISOString().replace(/:/g, "-");
  const backupDir = `backups/${timestamp}`;

  fs.mkdirSync(backupDir, { recursive: true });

  await backupMongoDB(backupDir);

  const zipPath = `${backupDir}.zip`;
  await zipFolder(backupDir, zipPath);

  await uploadToDrive(zipPath);

  fs.rmSync(backupDir, { recursive: true });
  fs.unlinkSync(zipPath);

  console.log("✅ Backup completed:", timestamp);
});
