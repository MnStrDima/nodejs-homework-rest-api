const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContactById,
  patchContactById,
} = require("../../controllers/contactsController");

const {
  validationQueryContact,
  validationAddContact,
  validationUpdateContact,
  validationUpdateContactFavoriteStatus,
  validationObjectId,
} = require("./contactsValidation");
const guard = require("../../helpers/guard");

const errorHandler = require("../../helpers/errorHandlerWrapper");

router.get("/", guard, validationQueryContact, getAllContacts);
router.post("/", guard, validationAddContact, errorHandler(createContact));

router.get("/:contactId", guard, validationObjectId, getContactById);
router.delete("/:contactId", guard, validationObjectId, deleteContact);
router.put(
  "/:contactId",
  guard,
  validationObjectId,
  validationUpdateContact,
  updateContactById
);
router.patch(
  "/:contactId/favorite",
  guard,
  validationObjectId,
  validationUpdateContactFavoriteStatus,
  patchContactById
);

module.exports = router;
