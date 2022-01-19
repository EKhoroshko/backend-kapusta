/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const register = require("../../controllers/auth/register");
const login = require("../../controllers/auth/login");
const logout = require("../../controllers/auth/logout");
const verifyResending = require("../../controllers/auth/verifyResending");
const verify = require("../../controllers/auth/verify");
const getCurrenUser = require("../../controllers/auth/getCurrenUser");
const updateAvatar = require("../../controllers/auth/udateAvatar");
const { userValidation } = require("../../midlewares/validation/user");
const { authValidation } = require("../../midlewares/auth/authValidation");
const upload = require("../../midlewares/auth/upload");
const { userLogin } = require("../../midlewares/validation/userLogin");
const googleAuth = require("../../controllers/auth/googleAuth");
const googleRedirect = require("../../controllers/auth/googleRedirect");
const verifyValidation = require("../../midlewares/validation/verify");
const patchPas = require("../../controllers/auth/patchPassword");

router.post("/users/register", userValidation, register);
router.post("/users/login", userLogin, login);
router.get("/users/logout", authValidation, logout);

router.post("/users/verify", verifyValidation, verifyResending);
router.get("/users/verify/:verificationToken", verify);
router.get("/users/current", authValidation, getCurrenUser);

router.patch(
  "/users/avatars",
  authValidation,
  upload.single("avatarURL"),
  updateAvatar
);

router.patch("/users/password", authValidation, patchPas);

// GOOGLE AUTH
router.get("/google", googleAuth);
router.get("/google-redirect", googleRedirect);

module.exports = router;
