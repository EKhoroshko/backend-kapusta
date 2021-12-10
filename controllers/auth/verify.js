/* eslint-disable semi */
/* eslint-disable quotes */
const { User } = require("../../models");

const verifyCntr = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    });
    res.status(200).json({ message: "Verification successfull" });
  } catch (err) {
    next(err.message);
  }
};

module.exports = verifyCntr;
