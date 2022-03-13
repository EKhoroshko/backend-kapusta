/* eslint-disable no-undef */
/* eslint-disable padded-blocks */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
const { User } = require("../../models");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user
  const { avatarURL } = req.body;
  try {
    const user = await User.findByIdAndUpdate(_id, { avatarURL: avatarURL }, { new: true })
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'Not Found' })
    }
    return res.status(200).json({ avatarURL: avatarURL })
  } catch (error) {
    next(error)
  }
}

module.exports = updateAvatar;
