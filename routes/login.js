const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



router.post('/login', (req, res) => {
  console.log("body", req.body)
  const user = User.findOne({ username: req.body.username });
  // console.log("user", user)
  if (!user) return res.send("Error", "username or password is incorrect.")
  const checkPwd = bcrypt.compare(req.body.password, user.password);
  if (!checkPwd) return res.send("Error", "username or password is incorrect.")

  //for jwt token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SCRCRET);
  // console.log("token", token)
  res.send({ "message": "login successfully.", "token": token })
});

module.exports = router;