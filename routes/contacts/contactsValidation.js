const Joi = require("joi");
const mongoose = require("mongoose");

const contactAddSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),

  favorite: Joi.boolean().optional(),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional(),

  favorite: Joi.boolean().optional(),
}).xor("name", "email", "phone", "favorite");

const contactUpdateFavoriteStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const queryContactsSchema = Joi.object({
  sortBy: Joi.string().valid("name", "email", "phone", "favorite").optional(),
  sortByDesc: Joi.string()
    .valid("name", "email", "phone", "favorite")
    .optional(),
  filter: Joi.string().valid("name", "email", "phone", "favorite").optional(),
  limit: Joi.number().integer().min(1).max(50).optional(),
  page: Joi.number().integer().min(0).optional(),
  favorite: Joi.boolean().optional(),
}).without("sortBy", "sortByDesc");

const validate = async (schema, contactObj, next) => {
  try {
    await schema.validateAsync(contactObj);
    return next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

module.exports = {
  validationQueryContact: async (req, res, next) => {
    return await validate(queryContactsSchema, req.query, next);
  },
  validationAddContact: async (req, res, next) => {
    return await validate(contactAddSchema, req.body, next);
  },
  validationUpdateContact: async (req, res, next) => {
    return await validate(contactUpdateSchema, req.body, next);
  },
  validationUpdateContactFavoriteStatus: async (req, res, next) => {
    return await validate(contactUpdateFavoriteStatusSchema, req.body, next);
  },
  validationObjectId: async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return next({ status: 400, message: "Invalid ObjectId" });
    }
    next();
  },
};
