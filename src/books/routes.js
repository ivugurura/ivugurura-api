import { Router } from "express";
import {
  catchErrors,
  doesEntityExist,
  isAdminOrEditor,
  isBodyValid,
} from "../middlewares";
import {
  deleteBook,
  downloadBook,
  getBookCategories,
  getBooks,
  readBook,
  registerBook,
} from "./controllers";

const bookRoutes = Router();

bookRoutes.post(
  "/",
  isAdminOrEditor,
  isBodyValid("book"),
  catchErrors(registerBook),
);
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
bookRoutes.get(
  "/:bookId/download",
  doesEntityExist("Book", "bookId"),
  catchErrors(downloadBook),
);

export default bookRoutes;
