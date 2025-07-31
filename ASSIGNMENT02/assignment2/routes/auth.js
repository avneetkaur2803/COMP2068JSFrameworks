const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

//  Registration form
router.get('/register', (req, res) => {
  res.render('auth/register');
});

//  Handle registration form
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.send('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword
    });

    await newUser.save();
    res.redirect('/auth/login');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
});

// Login form
router.get('/login', (req, res) => {
  res.render('auth/login');
});

//  Handle login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/records',
  failureRedirect: '/auth/login'
}));

//  Logout
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/auth/login');
  });
});

module.exports = router;
