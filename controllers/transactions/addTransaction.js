/* eslint-disable quotes */
/* eslint-disable spaced-comment */
/* eslint-disable semi */
// const addContact = require("../../model/contacts/addContact");
const { Transaction } = require("../../models");
const addTransaction = async (req, res, next) => {
  try {
    const date = new Date();
    const currentDate = date.toLocaleDateString();
    console.log(typeof currentDate);
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    const { transType } = req.params;
    console.log(transType);
    const updatedNewTransaction = {
      ...req.body,
      date: currentDate,
      month: currentMonth,
      year: currentYear,
      transactionType: transType,
      owner: req.user._id,
    };
    const newTransaction = await Transaction.create(updatedNewTransaction);
    res.status(201).json({ newTransaction, status: "success" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = addTransaction;
