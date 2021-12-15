/* eslint-disable semi */
/* eslint-disable quotes */
const { User } = require("../../models");
const sendMail = require("../../helpers/sendGrid/sendMail.js");
const { PORT } = process.env;
// const fs = require("fs/promises");
// const path = require("path");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res, next) => {
  try {
    const { email, password, userName } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      res
        .status(409)
        .json({ errors: `User with email: ${email} already exist` });
    }
    const verificationToken = uuidv4();
    const newUser = new User({ email, userName, verificationToken });
    newUser.setPassword(password);
    await newUser.save();

    const mail = {
      to: email,
      subject: "Подтверждение регистрации",
      html: `<a href="http://localhost:${PORT}/api/auth/users/verify/${verificationToken}">Перейдите по ссылке для подтверждения</a>`,
      // html: `<a href="https://back-kapusta.herokuapp.com/api/auth/users/verify/${verificationToken}">
      //     Перейдите по ссылке для подтверждения
      //   </a>`,
    };

    await sendMail(mail);
    res.status(201).json({
      newUser,
      status: "success",
      code: 201,
      message: "Register success",
    });
  } catch (error) {
    next(error.message);
  }
};

module.exports = register;
