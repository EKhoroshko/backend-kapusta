/* eslint-disable semi */
/* eslint-disable quotes */
const sendgridMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
sendgridMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  const email = { ...data, from: "gurienkova@gmail.com" };
  await sendgridMail.send(email);
  return true;
};

module.exports = sendMail;
