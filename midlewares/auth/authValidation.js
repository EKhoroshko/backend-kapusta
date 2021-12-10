/* eslint-disable semi */
/* eslint-disable quotes */
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const authValidation = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") {
      res.status(401).json({ message: "Not authorized" });
    }

    try {
      const { id } = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(id);
      if (!user) {
        res.status(401).json({ message: "User not found" });
      }
      if (!user.token) {
        res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (err) {
      next(err.message);
    }
  } catch (err) {
    next(err.message);
  }
};

module.exports = {
  authValidation,
};
