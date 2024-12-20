import cron from "node-cron";
import { backupDb } from "./backupDb";

export const dbBackup = () => {
  const EVERY_WEEK_1AM = "*/5 * * * *";
  cron.schedule(EVERY_WEEK_1AM, () => {
    console.log("Running every weekend");

    backupDb();
  });
};
