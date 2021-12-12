/* eslint-disable spaced-comment */
/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const { authValidation } = require("../../midlewares/auth/authValidation");
const updateBalance = require("../../controllers/transactions/updateBalance");
const addTransaction = require("../../controllers/transactions/addTransaction");
const deleteTransaction = require("../../controllers/transactions/deleteTransaction");
const getAllTransactions = require("../../controllers/transactions/getAllTransactions");

router.use(authValidation); //все рауты пропускаю чз аутентификацию
router.patch("/:userId", updateBalance);
router.post("/:transType", addTransaction);
router.get("/:transType/:month", getAllTransactions);
router.delete("/:transactionId", deleteTransaction);

module.exports = router;
