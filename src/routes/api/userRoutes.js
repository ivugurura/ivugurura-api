import { Router } from "express";
import {
  userSignin,
  getDashboardCounts,
  getTopicsForAdmin,
  logoutUser,
  createUser,
  getSystemUsers,
  updateUser,
  deleteUser,
  getMyProfile,
} from "../../controllers/userController";
import {
  catchErrors,
  isLoginInfoValid,
  isSuperAdmin,
  isUserInfoValid,
  isAdminOrEditor,
  isAdmin,
  canUserBeDeleted,
  isAuthenticated,
} from "../../middlewares";

const userRoutes = Router();
userRoutes.post(
  "/",
  isSuperAdmin,
  catchErrors(isUserInfoValid),
  catchErrors(createUser),
);
userRoutes.patch(
  "/:userId",
  isAdmin,
  catchErrors(isUserInfoValid),
  catchErrors(updateUser),
);
userRoutes.delete(
  "/:userId",
  isAdmin,
  catchErrors(canUserBeDeleted),
  catchErrors(deleteUser),
);
userRoutes.get("/", isAdmin, catchErrors(getSystemUsers));
userRoutes.get("/my-profile", isAuthenticated, catchErrors(getMyProfile));
userRoutes.post("/login", isLoginInfoValid, catchErrors(userSignin));
userRoutes.get("/dashboard", isAdminOrEditor, catchErrors(getDashboardCounts));
userRoutes.get("/topics", isAdminOrEditor, catchErrors(getTopicsForAdmin));
userRoutes.use("/logout", logoutUser);

export default userRoutes;
