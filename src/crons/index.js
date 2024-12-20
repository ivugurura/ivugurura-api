import cron from "node-cron";
import { backupDb } from "./backupDb";

export const dbBackup = () => {
  /**
   * Uncomment the following line when testing in local
   */
  // process.env.EVERY_WEEK_1AM = "* * * * *";
  cron.schedule(process.env.EVERY_WEEK_1AM, () => {
    console.log("Running every weekend");

    backupDb();
  });
};
