/* eslint-disable quotes */
/* eslint-disable spaced-comment */
/* eslint-disable semi */
//const removeContact = require("../../model/contacts/removeContact");
const { Transaction } = require("../../models");
const deleteTransaction = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const removedTransaction = await Transaction.findByIdAndRemove(
      req.params.transactionId
    );
    if (!removedTransaction) {
      res.status(404).json({ message: "No such transaction" });
    }
    res.status(200).json({ message: "successfully removed" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = deleteTransaction;
