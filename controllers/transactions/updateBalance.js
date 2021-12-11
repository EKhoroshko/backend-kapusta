/* eslint-disable quotes */
/* eslint-disable spaced-comment */
/* eslint-disable semi */
//const updateContact = require("../../model/contacts/updateContact");
const { User } = require("../../models");
const updateBalance = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!result) {
      res.status(404).json({ message: `Balance was successfully update` });
    }
    res.json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateBalance;
