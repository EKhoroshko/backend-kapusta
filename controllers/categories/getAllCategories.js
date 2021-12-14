/* eslint-disable quotes */
/* eslint-disable semi */

const { Categories } = require("../../models");

const getAllTransactions = async (req, res, next) => {
  try {
    const categories = await Categories.find({});
    res.status(200).json({ categories, status: "success" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = getAllTransactions;
