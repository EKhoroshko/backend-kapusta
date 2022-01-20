/* eslint-disable no-undef */
/* eslint-disable padded-blocks */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models");

const avatarDir = path.join(__dirname, "../../public/avatars");

const updateAvatar = async (req, res, next) => {
  const { id } = req.user
  const { path: tempUpload, filename } = req.file
  await Jimp.read(tempUpload).then(image => {
    return image
      .resize(250, 250).write(tempUpload)
  })
  try {
    const resultUpload = path.join(avatarDir, filename)
    await fs.rename(tempUpload, resultUpload)
    const avatar = path.join('/avatars', filename)
    const user = await User.findByIdAndUpdate(id, { avatarURL: avatar }, { new: true })
    if (!user) {
      return res.status(404).json({ message: 'Not Found' })
    }
    return res.status(200).json({ avatarURL: user.avatarURL })
  } catch (error) {
    await fs.unlink(tempUpload)
    next(error)
  }
}

module.exports = updateAvatar;
