import { ctrlWrapper, HttpError } from "../../helpers/index.js";
import { Contact } from "../../models/index.js";

export const updateContact = ctrlWrapper(async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "Body must have at least one field");
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
});
