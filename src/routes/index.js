import { Router } from "express";
import { getYoutubeVideos } from "../controllers/manageController";
import { getLang } from "../helpers";
import { translate } from "../locales";
import {
  monitorDevActions,
  route404,
  setLanguage,
  catchErrors,
} from "../middlewares";
import apiRoutes from "./api";

const routes = Router();

routes.use(monitorDevActions);
routes.get("/", (req, res) => {
  const lang = getLang(req);
  res.status(200).json({ message: translate[lang].welcomeMesg });
});
routes.use("/v1", catchErrors(setLanguage), apiRoutes);
routes.get("/v1/youtube", catchErrors(getYoutubeVideos));
routes.all("/*", route404);

export default routes;
