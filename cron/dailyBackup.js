import cron from "node-cron";
import { runBackup } from "../services/runBackup.js";

let isRunning = false;

global.runBackup = async () => {
  if (isRunning) {
    console.log("⏳ Backup already running, skipping");
    return;
  }

  isRunning = true;

  try {
    await runBackup();
  } catch (err) {
    console.error("❌ Backup failed:", err);
  } finally {
    isRunning = false;
  }
};

// ✅ CORRECT ORDER
cron.schedule(
  "0 2 * * *",
  global.runBackup,
  {
    timezone: "Asia/Kolkata",
  }
);

console.log("⏰ Daily backup cron scheduled (2 AM IST)");
