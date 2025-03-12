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
import { validateBookAccess } from "./middlewares";

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
  validateBookAccess,
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
  validateBookAccess,
  doesEntityExist("Book", "bookId"),
  catchErrors(downloadBook),
);

export default bookRoutes;
