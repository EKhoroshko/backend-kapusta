/* eslint-disable quotes */
/* eslint-disable spaced-comment */
/* eslint-disable semi */
const { Transaction } = require("../../models");

const getCostsIncomesTrans = async (req, res, next) => {
  try {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const months = [
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

    const nowMonth = months[date.getMonth()];
    const currentYear = date.getFullYear();
    const { _id } = req.user;
    const {
      transType,
      month = currentMonth,
      monthString = nowMonth,
      year = currentYear,
    } = req.params;

    const transaction = await Transaction.find({
      owner: _id,
      transactionType: transType,
      month: +month,
      monthString,
      year: +year,
    });

    res.status(200).json({ transaction, status: "success" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = getCostsIncomesTrans;
