import { Router } from "express";
import { catchErrors, doesEntityExist, isAdminOrEditor } from "../middlewares";
import {
  getBookCategories,
  getBooks,
  readBook,
  registerBook,
} from "./controllers";
import { isBookValid } from "./middlewares";

const bookRoutes = Router();

bookRoutes.post("/", isAdminOrEditor, isBookValid, catchErrors(registerBook));
bookRoutes.get("/", catchErrors(getBooks));
bookRoutes.get("/categories", catchErrors(getBookCategories));
bookRoutes.get(
  "/:bookId",
  doesEntityExist("Book", "bookId"),
  catchErrors(readBook),
);

export default bookRoutes;
