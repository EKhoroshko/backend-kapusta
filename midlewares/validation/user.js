/* eslint-disable semi */
/* eslint-disable quotes */

const Joi = require("joi");

const userValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "org", "uk", "net", "ua", "ru"] },
      })
      .required(),

    password: Joi.string().min(8).required(),
    userName: Joi.string().min(2).required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: validationResult.error.message,
    });
    return;
  }
  next();
};

module.exports = { userValidation };
