import { ctrlWrapper } from "../../helpers/index.js";
import { Contact } from "../../models/index.js";

export const getAllContacts = ctrlWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = favorite === "true" ? { owner, favorite: true } : { owner };

  const result = await Contact.find(filter, "+updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");

  const total = result.length;

  res.json({ total, result });
});
