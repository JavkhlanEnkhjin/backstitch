const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// register
router.post("/register", async (req, res) => {
  try {
    //checking email validation with regex below
    let reEmail = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    if (!reEmail.test(req.body.email)) {
      return res.status(400).json("Invalid");
    }
    //checking username validation with regex below
    let reUsername = /^[a-zA-Z][a-zA-Z\d-_\.]+$/;
    if (!reUsername.test(req.body.username)) {
      return res.status(400).json("Invalid");
    }
    //generating salt using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    //creating user and save
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    //checking username in user
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json("Wrong login");
    }
    //checking password match using bcrypt
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json("Wrong login");
    }
    //if validated, responding properties expect password
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
