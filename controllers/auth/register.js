/* eslint-disable semi */
/* eslint-disable quotes */
const { User } = require("../../models");
const sendMail = require("../../helpers/sendGrid/sendMail.js");
const { FRONTEND_URL } = process.env;
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const gravatar = require("gravatar");
const avatarDir = path.join(__dirname, "../../public/avatars");

const register = async (req, res, next) => {
  try {
    const { email, password, userName } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      res
        .status(409)
        .json({ errors: `User with email: ${email} already exist` });
    }

    const avatarURL = gravatar.url(`${email}`);
    const verificationToken = uuidv4();
    const newUser = new User({ email, userName, avatarURL, verificationToken });
    newUser.setPassword(password);
    await newUser.save();

    const mail = {
      to: email,
      subject: "Подтверждение регистрации",
      html: `<a href="${FRONTEND_URL}/verify/${verificationToken}">
          Спасибо, что зарегистрировались. Перейдите пожалуйста по данной ссылке для подтверждения имейла
        </a>`,
    };

    await sendMail(mail);
    const avatarFolder = path.join(avatarDir, String(newUser._id));
    await fs.mkdir(avatarFolder);
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
