/* eslint-disable quotes */
/* eslint-disable spaced-comment */
/* eslint-disable semi */
//const listContacts = require("../../model/contacts/listContacts");
const { Transaction } = require("../../models");
//const { addPostValidation } = require("../middlewares/validationJoi");

const getAllTransactions = async (req, res, next) => {
  try {
    //const { page, limit } = req.query;
    const { _id } = req.user;
    //const skip = (page - 1) * limit;

    const transaction = await Transaction.find({
      owner: _id,
    });

    res.status(200).json({ transaction, status: "success" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = getAllTransactions;
