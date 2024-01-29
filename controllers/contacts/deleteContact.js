import { ctrlWrapper, HttpError } from "../../helpers/index.js";
import { Contact } from "../../models/index.js";

export const deleteContact = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
});
