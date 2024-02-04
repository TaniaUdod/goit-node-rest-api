import { ctrlWrapper } from "../../helpers/index.js";

export const getCurrent = ctrlWrapper(async (req, res, next) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
});
