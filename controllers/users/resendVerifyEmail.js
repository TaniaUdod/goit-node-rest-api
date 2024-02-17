import { HttpError, ctrlWrapper, sendEmail } from "../../helpers/index.js";
import { User } from "../../models/index.js";

import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join("config", ".env") });

const { BASE_URL } = process.env;

export const resendVerifyEmail = ctrlWrapper(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(400, "Missing required field email");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    message: "Verification email sent",
  });
});
