/* eslint-disable quotes */
/* eslint-disable semi */
const { Schema, model } = require("mongoose");

const categoriesSchema = Schema(
  {
    name: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Categories = model("category", categoriesSchema);

module.exports = Categories;
