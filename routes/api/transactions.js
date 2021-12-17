/* eslint-disable spaced-comment */
/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const { authValidation } = require("../../midlewares/auth/authValidation");
const updateBalance = require("../../controllers/transactions/updateBalance");
const addTransaction = require("../../controllers/transactions/addTransaction");
const deleteTransaction = require("../../controllers/transactions/deleteTransaction");
const getCostsIncomesTrans = require("../../controllers/transactions/getCostsIncomesTrans");
const getAllTransactions = require("../../controllers/transactions/getAllTransactions");
const {
  transactionsValidate,
} = require("../../midlewares/validation/transactionsValidate");

router.use(authValidation); //все рауты пропускаю чз аутентификацию
router.patch("/:userId", updateBalance);
router.post("/", transactionsValidate, addTransaction);
router.get("/all", getAllTransactions);
router.get("/:transType/:year?/:month?", getCostsIncomesTrans);

router.delete("/:transactionId", deleteTransaction);

module.exports = router;
