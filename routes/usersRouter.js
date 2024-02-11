import express from "express";
import { authenticate, upload, validateBody } from "../helpers/index.js";
import {
  loginSchema,
  registerSchema,
  updateSubscriptionSchema,
} from "../schemas/index.js";
import {
  getCurrent,
  login,
  logout,
  register,
  updateAvatar,
  updateSubscription,
} from "../controllers/users/index.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(registerSchema), register);

usersRouter.post("/login", validateBody(loginSchema), login);

usersRouter.post("/logout", authenticate, logout);

usersRouter.get("/current", authenticate, getCurrent);

usersRouter.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateSubscription
);

usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

export default usersRouter;
