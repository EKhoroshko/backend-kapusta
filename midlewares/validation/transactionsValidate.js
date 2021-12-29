/* eslint-disable semi */
/* eslint-disable quotes */

const Joi = require("joi");

const transactionsValidate = (req, res, next) => {
  const schema = Joi.object({
    sum: Joi.number().required(),
    date: Joi.string(),
    category: Joi.string().required(),
    transactionType: Joi.string().required(),
    description: Joi.string(),
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

module.exports = { transactionsValidate };
