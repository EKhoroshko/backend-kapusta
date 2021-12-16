/* eslint-disable semi */
/* eslint-disable quotes */

const { User } = require("../../models");

const getCurrenUser = async (req, res, next) => {
  console.log("hello");

  try {
    const token = req.user;

    // console.log(token);

    const user = await User.findOne(token);

    if (!user) {
      res.status(401).json({ message: "Invalid token" });
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        token: user.token,
        email: user.email,
        userName: user.userName,
        id: user._id,
      },
    });
  } catch (error) {
    next(error.message);
  }
};

module.exports = getCurrenUser;
