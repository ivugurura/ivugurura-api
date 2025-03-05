import { Router } from "express";
import { catchErrors, doesEntityExist, isAdminOrEditor } from "../middlewares";
import {
  deleteBook,
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
bookRoutes.delete(
  "/:bookId",
  isAdminOrEditor,
  doesEntityExist("Book", "bookId"),
  catchErrors(deleteBook),
);

export default bookRoutes;
