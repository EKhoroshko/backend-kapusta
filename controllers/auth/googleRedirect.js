/* eslint-disable semi */
/* eslint-disable quotes */
// const { User } = require("../../models");
const queryString = require("query-string");
const axios = require("axios");
// const URL = require("url");

const googleRedirect = async (req, res, next) => {
  try {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const urlObj = new URL(fullUrl);
    const urlParams = queryString.parse(urlObj.search);
    const code = urlParams.code;
    const tokenData = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: "post",
      data: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
        grant_type: "authorization_code",
        code,
      },
    });
    const userData = await axios({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${tokenData.data.access_token}`,
      },
    });
    // userData.data.email
    // ...
    // ...
    // ...
    return res.redirect(
      `${process.env.FRONTEND_URL}?email=${userData.data.email}` // ИЗМЕНИТЬ НА ТОКЕН
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

module.exports = googleRedirect;
