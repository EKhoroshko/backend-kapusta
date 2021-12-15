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
const { url } = require("inspector");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models");

const avatarDir = path.join(__dirname, "../../public/avatars");
//console.log("ПУТЬ К ПАПКЕ АВАТАРОК", avatarDir);

//avatarURL.resize(250, 250, Jimp.RESIZE_BEZIER);
const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  try {
    const { id } = req.user;
    console.log(id);
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      res.status(401).json({ message: "Not authorized" });
    }

    const resultUpload = path.join(avatarDir, id, `${id}${originalname}`);
    console.log(resultUpload);
    Jimp.read(resultUpload, (err, image) => {
      if (err) throw err;
      image
        .resize(250, 250) // resize
        //   .quality(60) // set JPEG quality
        //   .greyscale() // set greyscale
        .write(`${id}${originalname}`); // save
    });
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("/public/avatars", id, `${id}${originalname}`);
    console.log(avatarURL);
    const result = await User.findByIdAndUpdate(
      id,
      { avatarURL },
      { new: true }
    );
    if (!result) {
      res.status(401).json({ message: "No AVATARS" });
    }
    console.log("RESULT", result);
    res.json({
      status: "success",
      code: 200,
      data: {
        avatarURL,
        //result,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload); //удаляет неудачное сохранение
    next(error.message);
  }
};

module.exports = updateAvatar;
