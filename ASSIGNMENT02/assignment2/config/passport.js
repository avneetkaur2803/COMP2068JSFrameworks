const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) return done(null, false, { message: 'Incorrect username' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password' });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(new GitHubStrategy({
  clientID: 'Ov23li5xzfdnX9Qbdn0Q',
  clientSecret: 'aa1ca20ca7c38634d5e1603be80add6f373bec16',
  callbackURL: "http://localhost:3000/auth/github/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Find or create the user
    const existingUser = await User.findOne({ username: profile.username });

    if (existingUser) {
      return done(null, existingUser);
    } else {
      const newUser = new User({
        username: profile.username,
        password: 'github' // placeholder (not used for GitHub users)
      });
      await newUser.save();
      return done(null, newUser);
    }
  } catch (err) {
    return done(err);
  }
}));


  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
