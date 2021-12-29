/* eslint-disable quotes */
/* eslint-disable spaced-comment */
/* eslint-disable semi */
// const addContact = require("../../model/contacts/addContact");
const { Transaction } = require("../../models");
const addTransaction = async (req, res, next) => {
  console.log(req.body);
  try {
    const date = req.body.date.split('.');
    const currentDate = date.join('/');
    const currentMonth = +date[1];
    const month = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    const nowMonth = month[currentMonth - 1];
    const currentYear = +date[2];
    const updatedNewTransaction = {
      ...req.body,
      date: currentDate,
      month: currentMonth,
      monthString: nowMonth,
      year: currentYear,

      owner: req.user._id,
    };
    const newTransaction = await Transaction.create(updatedNewTransaction);
    res.status(201).json({ newTransaction, status: "success" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = addTransaction;
