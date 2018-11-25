const passport = require('passport')
const LocalStrategy = require('passport-local')
const db = require('../models')
const User = db.User

passport.use(new LocalStrategy({
    passReqToCallback: true,
  },
  function(req, username, password, cb) {
    User.findOne({where: {username: username}}).then(user => {
      console.log(user.password, password)
      if (!user) return cb(null, false)
      if (user.password != password) return cb(null, false)
      return cb(null, user)
    })
  }
))

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findByPk(id).then(user => {
    return cb(null, user)
  })
})

module.exports = passport