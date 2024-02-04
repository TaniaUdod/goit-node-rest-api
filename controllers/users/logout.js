import { ctrlWrapper } from "../../helpers/index.js";
import { User } from "../../models/index.js";

export const logout = ctrlWrapper(async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
});
