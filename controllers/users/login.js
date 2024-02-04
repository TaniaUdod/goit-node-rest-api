import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HttpError, ctrlWrapper } from "../../helpers/index.js";
import { User } from "../../models/index.js";

import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join("config", ".env") });

const { SECRET_KEY } = process.env;

export const login = ctrlWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});
