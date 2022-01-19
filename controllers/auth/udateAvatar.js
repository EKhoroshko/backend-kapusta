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
  const { path: tempUpload, originalname } = req.file;

  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      res.status(401).json({ message: "Not authorized" });
    }

    const resultUpload = path.join(avatarDir, id, `${id}${originalname}`);
    Jimp.read(resultUpload, (err, image) => {
      if (err) throw err;
      image.resize(250, 250).write(`${id}${originalname}`);
    });
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("/public/avatars", id, `${id}${originalname}`);
    const result = await User.findByIdAndUpdate(
      id,
      { avatarURL },
      { new: true }
    );
    if (!result) {
      res.status(401).json({ message: "No AVATARS" });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload); //удаляет неудачное сохранение
    next(error.message);
  }
};

module.exports = updateAvatar;
