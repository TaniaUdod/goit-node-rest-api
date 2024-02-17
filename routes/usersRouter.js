import express from "express";
import { authenticate, upload, validateBody } from "../helpers/index.js";
import {
  loginSchema,
  registerSchema,
  updateSubscriptionSchema,
  verifySchema,
} from "../schemas/index.js";
import {
  getCurrent,
  login,
  logout,
  register,
  updateAvatar,
  updateSubscription,
  verifyEmail,
  resendVerifyEmail,
} from "../controllers/users/index.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(registerSchema), register);

usersRouter.get("/verify/:verificationToken", verifyEmail);

usersRouter.post("/verify", validateBody(verifySchema), resendVerifyEmail);

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
