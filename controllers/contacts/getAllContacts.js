import { ctrlWrapper } from "../../helpers/index.js";
import { Contact } from "../../models/index.js";

export const getAllContacts = ctrlWrapper(async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
});
