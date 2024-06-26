import express from "express";
// import bodyParser from 'body-parser';
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import passport from "passport";
import userAgent from "express-useragent";
import compression from "compression";
import { capture } from "express-device";
import { configurePassport } from "./config/passport";
import { sequelize } from "./models";
import routes from "./routes";
import { handleErrors } from "./middlewares";
import { security } from "./config/security";
import { appSocket } from "./config/socketIo";
import { session } from "./config/session";
import { dbBackup } from "./crons";
import { notifyMe } from "./helpers";

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(capture());
app.use(userAgent.express());
app.set("trust proxy", true);
security(app);
/**
 * Check database connection before running the app
 */
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((error) => {
    const isDev = process.env.NODE_ENV === "development";
    const isProduction = process.env.NODE_ENV === "production";
    if (isDev) {
      console.log("DB_Error", error);
      process.exit(1);
    }
    if (isProduction) {
      notifyMe("Something wrong with db", error.stack)
        .then(() => {
          console.log("Notified");
          process.exit(1);
        })
        .catch((err) => {
          console.log("Not Notified", err.message);
          process.exit(1);
        });
    }
  });
app.use(compression());
app.use(
  express.urlencoded({
    limit: "100mb",
    parameterLimit: 100000,
    extended: false,
  })
);
app.use(express.json({ limit: "100mb" }));
app.use(express.static("build"));
app.use("/songs", express.static("public/songs"));
app.use("/images", express.static("public/images"));
/**
 * Initialize passport and session
 */
app.use(session());
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
/**
 * App routes
 */
app.use("/api", routes);
/**
 * Catch unexpected errors from the API
 */
app.use(handleErrors);
/**
 * The frontend/cLient
 */
app.get("/*", (req, res) => {
  res.sendFile(path.resolve("build", "index.html"));
});
/**
 * Configure socket
 */
appSocket(app);

/**
 * Backup database
 */

dbBackup();
export default app;
