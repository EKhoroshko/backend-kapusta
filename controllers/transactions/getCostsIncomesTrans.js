/* eslint-disable quotes */
/* eslint-disable spaced-comment */
/* eslint-disable semi */
//const listContacts = require("../../model/contacts/listContacts");
const { Transaction } = require("../../models");
//const { addPostValidation } = require("../middlewares/validationJoi");

const getCostsIncomesTrans = async (req, res, next) => {
  try {
    const date = new Date();
    const currentDate = date.toLocaleDateString();
    console.log(typeof currentDate);
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
    //const { page, limit } = req.query;
    const { _id } = req.user;
    const {
      transType,
      month = currentMonth,
      monthString = nowMonth,
      year = currentYear,
    } = req.params;
    //const skip = (page - 1) * limit;

    const transaction = await Transaction.find({
      owner: _id,
      transactionType: transType,
      month: +month,
      monthString,
      year: +year,
    });

    res.status(200).json({ transaction, status: "success" });

    //   "_id month year sum  transactionType description category owner",
    //   { skip, limit: +limit }
    // ).populate("owner", "_id");
  } catch (error) {
    next(error.message);
  }
};

module.exports = getCostsIncomesTrans;
