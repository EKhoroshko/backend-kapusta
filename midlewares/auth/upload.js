/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable semi */
const multer = require("multer");
const path = require("path");
const tempDir = path.join(__dirname, "../", "temp"); // + "../" - to find tmp Folder
// console.log(tempDir);

const uploadConfig = multer.diskStorage({
  distination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  //   limits: {
  //     fileSize: 2048,
  //   },
});

const upload = multer({
  storage: uploadConfig,
});

module.exports = upload;
