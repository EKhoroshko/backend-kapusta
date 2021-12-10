/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const register = require("../../controllers/auth/register");
const login = require("../../controllers/auth/login");
const logout = require("../../controllers/auth/logout");
const verifyResending = require("../../controllers/auth/verifyResending");
const verifyController = require("../../controllers/auth/verify");
const { userValidation } = require("../../midlewares/validation/user");
const { authValidation } = require("../../midlewares/auth/authValidation");
const verifyValidation = require("../../midlewares/validation/verify");

router.post("/users/register", userValidation, register);
router.post("/users/login", userValidation, login);
router.get("/users/logout", authValidation, logout);

router.post("/users/verify", verifyValidation, verifyResending);
router.get("/users/verify:verificationToken", verifyController);

module.exports = router;
