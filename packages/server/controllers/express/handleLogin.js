const { jwtVerify, getJwt } = require("../jwt/jwtAuth");
const User = require("../../models/user");
require("dotenv").config();


const handleLogin = async (req, res) => {
  const token = getJwt(req);

  if (!token) {
    res.json({ loggedIn: false });
    return;
  }

  try {
    const decoded = await jwtVerify(token, process.env.JWT_SECRET);

    const potentialUser = await User.findOne({ username: decoded.username });

    if (!potentialUser) {
      res.json({ loggedIn: false, token: null });
      return;
    }

    res.json({ loggedIn: true, token });
  } catch (error) {
    console.error("Error during login verification:", error);
    res.json({ loggedIn: false });
  }
};

module.exports = handleLogin;
