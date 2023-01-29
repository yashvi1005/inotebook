const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "nodejsjsonwebtoken";

exports.authe = async (req, res) => {
  let success = false;
  //If there are errors return bad requst and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  //check for already existing email
  try {
    const duplicateEmail = await User.findOne({ email: req.body.email });
    if (duplicateEmail) {
      return res.status(400).json({success, errors: "sorry email alrady exists" });
    }
    //create a new user
    const name = req.body.name;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const email = req.body.email;
    const user = new User({
      name: name,
      password: hashedPassword,
      email: email,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    let success = true;
    res.json({success, authtoken})
    return await user.save();
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

exports.postLogin = async (req, res) => {
  //If there are errors return bad requst and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const email = req.body.email;
  const password = req.body.password;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "please try to login with correct Credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      const success = false
      return res
        .status(400)
        .json({ success, error: "please try to login with correct Credentials" });
    }
    const data = {
      user: {
        id: user.id
      }
 
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    const success = true
    res.json({success, authtoken});
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

exports.postLogedinUser = async (req, res) => {
  //If there are errors return bad requst and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};
