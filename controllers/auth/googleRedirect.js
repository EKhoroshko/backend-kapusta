/* eslint-disable semi */
/* eslint-disable quotes */
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { SECRET_KEY } = process.env;
const queryString = require("query-string");
const axios = require("axios");
const { BASE_URL } = process.env;
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const gravatar = require("gravatar");
const avatarDir = path.join(__dirname, "../../public/avatars");

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
        redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
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
    console.log(userData.data);
    const { email } = userData.data;
    const user = await User.findOne({ email });
    if (user && user.verify) {
      const payload = {
        id: user._id,
      };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
      await User.findByIdAndUpdate(user._id, { token });
      return res.redirect(`${process.env.FRONTEND_URL}/home?token=${token}`);
    } else {
      const avatarURL = gravatar.url(`${email}`);
      const verificationToken = uuidv4();
      const payload = {
        id: userData.data.id,
      };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
      const newUser = new User({
        email: userData.data.email,
        userName: userData.data.name,
        avatarURL,
        verificationToken,
        verify: true,
        token,
      });
      await newUser.save();
      const avatarFolder = path.join(avatarDir, String(newUser._id));
      await fs.mkdir(avatarFolder);
      return res.redirect(`${process.env.FRONTEND_URL}/home?token=${token}`);
    }
  } catch (error) {
    next(error.message);
  }
};

module.exports = googleRedirect;
