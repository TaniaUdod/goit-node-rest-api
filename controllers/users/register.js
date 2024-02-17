import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

import { HttpError, ctrlWrapper, sendEmail } from "../../helpers/index.js";
import { User } from "../../models/index.js";

import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join("config", ".env") });

const { BASE_URL } = process.env;

export const register = ctrlWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
});
