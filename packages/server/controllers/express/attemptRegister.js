const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { jwtSign } = require("../jwt/jwtAuth");

const attemptRegister = async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });

    if (!existingUser) {
      // Register a new user
      const hashedPass = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        passhash: hashedPass,
        userid: uuidv4(),
      });

      const savedUser = await newUser.save();

      const token = await jwtSign(
        {
          username: savedUser.username,
          id: savedUser.id,
          userid: savedUser.userid,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({ loggedIn: true, token });
    } else {
      res.json({ loggedIn: false, status: "Username taken" });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.json({ loggedIn: false, status: "Try again later" });
  }
};

module.exports = attemptRegister;
