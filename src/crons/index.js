import cron from "node-cron";
import { backupDb } from "./backupDb";

export const dbBackup = () => {
  cron.schedule(process.env.EVERY_WEEK_1AM, () => {
    console.log("Running every weekend");

    backupDb();
  });
};
