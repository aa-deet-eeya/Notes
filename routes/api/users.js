require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/users");

// @routes POST api/users/
// @desc
// @access
router.post("/", (req, res, next) => {
  //res.send("register");
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please Enter all the fields" });
  }

  User.findOne({ email })
    .then((user) => {
      if (user)
        return res.status(400).json({
          msg: "User Already Exists",
        });

      const newUser = new User({
        name,
        email,
        password,
      });

      // Hashing
      bcrypt.genSalt(10, (err, salt) => {
        if (err) res.json({ err });
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) res.json({ err });
          newUser.password = hash;
          newUser.save().then((user) => {
            jwt.sign(
              { id: user.id },
              process.env.JWT,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) res.status(400).json({ err });
                res.json({
                  token,
                  user: {
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                  },
                });
              }
            );
          });
        });
      });
    })
    .catch((err) => {
      res.json({ err });
    });
});

router.post("/verify", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Please Input all the fields" });

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User Does not exist" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({
          msg: "Incorrect passowrd or email!",
        });

      jwt.sign(
        { id: user.id },
        process.env.JWT,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              _id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

module.exports = router;
