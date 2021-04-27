const express = require("express");
const router = express.Router();
const Contacts = require("../../model/contacts");
const {
  validationAddContact,
  validationUpdateContact,
  validationUpdateContactFavoriteStatus,
  validationObjectId,
} = require("./contactsValidation");

const errorHandler = require("../../helpers/errorHandlerWrapper");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", validationObjectId, async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: 201,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
});

router.post(
  "/",
  validationAddContact,
  errorHandler(async (req, res, next) => {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: { contact },
    });
  })
);

router.delete("/:contactId", validationObjectId, async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: 201,
        message: "Contact deleted",
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
});

router.put(
  "/:contactId",
  validationObjectId,
  validationUpdateContact,
  async (req, res, next) => {
    try {
      const contact = await Contacts.updateContact(
        req.params.contactId,
        req.body
      );
      if (contact) {
        return res.json({
          status: "success",
          code: 200,
          data: { contact },
        });
      } else {
        return res.status(404).json({
          status: "error",
          code: 404,
          data: "Not found",
        });
      }
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  "/:contactId/favorite",
  validationObjectId,
  validationUpdateContactFavoriteStatus,
  async (req, res, next) => {
    try {
      const contact = await Contacts.updateContact(
        req.params.contactId,
        req.body
      );

      if (contact) {
        return res.json({
          status: "success",
          code: 201,
          data: { contact },
        });
      } else {
        return res.status(404).json({
          status: "error",
          code: 404,
          data: "Not found",
        });
      }
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
