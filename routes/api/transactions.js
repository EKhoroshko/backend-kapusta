/* eslint-disable spaced-comment */
/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const { authValidation } = require("../../midlewares/auth/authValidation");
const updateBalance = require("../../controllers/transactions/updateBalance");
const addTransaction = require("../../controllers/transactions/addTransaction");
const deleteTransaction = require("../../controllers/transactions/deleteTransaction");
// const getAllContacts = require("../../controllers/contacts/getAllContacts");
// const getOneContact = require("../../controllers/contacts/getOneContact");
// const updateContactById = require("../../controllers/contacts/updateContactById");
// const deleteContact = require("../../controllers/contacts/deleteContact");
// const addToContacts = require("../../controllers/contacts/addToContacts");
// const updateStatusContac = require("../../controllers/contacts/updateStatusContact");

// const { authMiddlewares } = require("../../middlewares/auth/authmiddlewares");

// const { addPostValidation } = require("../../middlewares/validation/contacts");
router.use(authValidation); //все рауты пропускаю чз аутентификацию
router.patch("/:userId", updateBalance);
router.post("/:transType/:userId", addTransaction);
// router.get("/", getAllContacts);

// router.get("/:contactId", getOneContact);

// router.post("/", addPostValidation, addToContacts); //валидацию добавила и сюда и в аддКонтактс - где оставлять нужно?

router.delete("/:transactionId", deleteTransaction);

// router.patch("/:contactId", updateContactById);

// router.patch("/:contactId/favorite", updateStatusContac);

module.exports = router;
