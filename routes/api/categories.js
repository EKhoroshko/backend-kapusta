/* eslint-disable semi */
/* eslint-disable quotes */

const express = require("express");
const router = express.Router();

const getAllCategories = require("../../controllers/categories/getAllCategories");

router.get("/", getAllCategories);

module.exports = router;
