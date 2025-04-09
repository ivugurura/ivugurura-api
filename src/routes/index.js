import { Router } from "express";
import { getYoutubeVideos } from "../controllers/manageController";
import { getLang } from "../helpers";
import { translate } from "../locales";
import {
  monitorDevActions,
  route404,
  setLanguage,
  catchErrors,
  isAdmin,
} from "../middlewares";
import apiRoutes from "./api";
import { finalizeSingleUpload } from "../controllers/fileController";

const routes = Router();

routes.use(monitorDevActions);
routes.get("/", (req, res) => {
  const lang = getLang(req);
  res.status(200).json({ message: translate[lang].welcomeMesg });
});
routes.use("/v1", catchErrors(setLanguage), apiRoutes);
routes.get("/v1/youtube", catchErrors(getYoutubeVideos));
routes.post("/v1/upload-file/:fileType", isAdmin, finalizeSingleUpload);
routes.all("/*", route404);

export default routes;
