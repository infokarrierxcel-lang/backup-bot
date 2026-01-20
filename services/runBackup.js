import fs from "fs";
import path from "path";
import { backupMongoDB } from "./mongoBackup.js";
import { zipFolder } from "./zip.js";
import { uploadToDrive } from "./driveUpload.js";

export const runBackup = async () => {
  const timestamp = new Date()
    .toISOString()
    .replace(/:/g, "-")
    .replace(".000Z", "");

  const backupDir = path.join("backups", timestamp);
  fs.mkdirSync(backupDir, { recursive: true });

  console.log("📦 Starting MongoDB backup:", timestamp);

  await backupMongoDB(backupDir);

  const zipPath = `${backupDir}.zip`;
  await zipFolder(backupDir, zipPath);

  await uploadToDrive(zipPath);

  fs.rmSync(backupDir, { recursive: true, force: true });
  fs.unlinkSync(zipPath);

  console.log("✅ Backup completed:", timestamp);
};
