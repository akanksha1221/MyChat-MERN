const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtSign } = require("../jwt/jwtAuth");
const User = require("../../models/user");
require("dotenv").config();

const attemptLogin = async (req, res) => {
  try {
    const potentialLogin = await User.findOne({ username: req.body.username });

    if (potentialLogin) {
      const isSamePass = await bcrypt.compare(
        req.body.password,
        potentialLogin.passhash
      );

      if (isSamePass) {
        const token = await jwtSign(
          {
            username: req.body.username,
            id: potentialLogin.id,
            userid: potentialLogin.userid,
          },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        res.json({ loggedIn: true, token });
      } else {
        res.json({ loggedIn: false, status: "Wrong username or password!" });
        console.log("wrong pass");
      }
    } else {
      console.log("not good");
      res.json({ loggedIn: false, status: "Wrong username or password!" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.json({ loggedIn: false, status: "Try again later" });
  }
};

module.exports = attemptLogin;
