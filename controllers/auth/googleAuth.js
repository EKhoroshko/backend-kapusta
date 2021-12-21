/* eslint-disable spaced-comment */
/* eslint-disable semi */
/* eslint-disable quotes */
//const { User } = require("../../models");
const queryString = require("query-string");
//const axios = require("axios");
//const URL = require("url");

const googleAuth = async (req, res, next) => {
  try {
    const stringifiedParams = queryString.stringify({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ].join(" "),
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
    });
    return res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
    );
    // const { email, password } = req.body;
    // const user = await User.findOne({ email });
    // if (!user || !user.verify || !user.comparePassword(password)) {
    //   res.status(401).json({ errors: "Email or password is wrong" });
    // }
    // const payload = {
    //   id: user._id,
    // };
    // const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
    // await User.findByIdAndUpdate(user._id, { token });
    // res.json({
    //   status: "success",
    //   code: 200,
    //   data: {
    //     token,
    //     email,
    //     userName: user.userName,
    //     id: user._id,
    //     balance: user.balance,
    //     avatarURL: user.avatarURL,
    //   },
    // });
  } catch (error) {
    next(error.message);
  }
};

module.exports = googleAuth;
