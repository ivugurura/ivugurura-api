import { exec } from "child_process";
import fs from "fs";
import { Dropbox } from "dropbox";
import path from "path";
import { currentDate } from "../helpers";
import cfg from "../config/db";

export const backupDb = () => {
  // Dropbox configuration
  const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_TOKEN;
  const dropbox = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN });

  const env = process.env.NODE_ENV || "develop";
  const dbConfig = cfg[env];

  // PostgreSQL configuration
  const DB_NAME = dbConfig.database;
  const DB_USER = dbConfig.username;
  const DB_PASSWORD = dbConfig.password;
  const DB_HOST = dbConfig.host;
  const DB_PORT = dbConfig.port;
  const BACKUP_FOLDER = path.resolve(__dirname, process.env.BACKUP_ZONE);

  // Ensure backup folder exists
  if (!fs.existsSync(BACKUP_FOLDER)) {
    fs.mkdirSync(BACKUP_FOLDER, { recursive: true });
  }

  // Generate the backup file name
  const fileName = `${DB_NAME}_${env}_${currentDate()}.sql`;
  const filePath = path.join(BACKUP_FOLDER, fileName);

  // Create the backup
  const dumpCommand = `PGPASSWORD=${DB_PASSWORD} pg_dump -U ${DB_USER} -h ${DB_HOST} -p ${DB_PORT} -F c -b -v -f ${filePath} ${DB_NAME}`;

  exec(dumpCommand, (error, stdout, stderr) => {
    if (error) {
      console.error("Error creating database backup:", error);
      return;
    }

    console.log("Database backup created successfully:", filePath);

    // Read the backup file
    fs.readFile(filePath, (readError, content) => {
      if (readError) {
        console.error("Error reading backup file:", readError);
        return;
      }

      // Upload to Dropbox
      dropbox
        .filesUpload({ path: `/${fileName}`, contents: content })
        .then(() => {
          console.log("Backup uploaded to Dropbox successfully.");
          // Optionally, delete the local backup file
          fs.unlinkSync(filePath);
        })
        .catch(uploadError => {
          console.error("Error uploading to Dropbox:", uploadError);
        });
    });
  });
};
