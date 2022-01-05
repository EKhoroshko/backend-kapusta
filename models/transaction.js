/* eslint-disable quotes */
/* eslint-disable semi */
const { Schema, model } = require("mongoose");

const transactionSchema = Schema(
  {
    category: {
      type: String,
      required: [true, "Set name for category"],
    },
    label: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
    month: {
      type: Number,
    },
    monthString: {
      type: String,
    },
    year: {
      type: Number,
    },
    sum: {
      type: Number,
      required: [true, "Sum is required"],
    },
    transactionType: {
      type: String,
      required: [true, "Sum is required"],
      enum: ["incomes", "costs"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
