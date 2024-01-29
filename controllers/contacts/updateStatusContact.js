import { ctrlWrapper, HttpError } from "../../helpers/index.js";
import { Contact } from "../../models/index.js";

export const updateStatusContact = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
});
