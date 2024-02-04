import { ctrlWrapper } from "../../helpers/index.js";
import { User } from "../../models/index.js";

export const updateSubscription = ctrlWrapper(async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.status(200).json({
    subscription: updatedUser.subscription,
  });
});
