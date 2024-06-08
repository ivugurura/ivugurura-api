import cron from "node-cron";
import { exec } from "child_process";
import { currentDate } from "../helpers/util";

const EVERY_WEEK_1AM = "* * * * * ";

export const dbBackup = () => {
  const outputFile = `${process.env.BACKUP_ZONE}/Ivugurura_Db_${currentDate()}`;

  const bUpScript = `pg_dump ${process.env.DB_DEV_NAME} -U ${process.env.DB_USER} -h ${process.env.DB_HOST}`;
  const bUpPwd = `PGPASSWORD=${process.env.DB_PASSWORD}`;
  const DB_BACKUP_COMMAND = `${bUpPwd} ${bUpScript} > ${outputFile}_P.dump`;
  cron.schedule(process.env.EVERY_WEEK_1AM, () => {
    console.log("Running every weekend");

    exec(DB_BACKUP_COMMAND, (error) => {
      if (error) {
        console.log(error.message);
      } else console.log("Completed");
    });
  });
};
