/* eslint-disable semi */
/* eslint-disable quotes */
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(res.headers);
    if (!user || !user.verify || !user.comparePassword(password)) {
      res.status(401).json({ errors: "Email or password is wrong" });
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "success",
      code: 200,
      data: {
        token,
        email,
        userName: user.userName,
        id: user._id,
      },
    });
  } catch (error) {
    next(error.message);
  }
};

module.exports = login;
