import { ctrlWrapper } from "../../helpers/index.js";
import { Contact } from "../../models/index.js";

export const createContact = ctrlWrapper(async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
});
