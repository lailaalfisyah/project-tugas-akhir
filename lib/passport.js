const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { Users } = require('../models')

// menjalankan proses autentikasi user
authenticate = async (username, password, done) => {
  try {
    const user = await Users.authenticate({ username, password })

    return done(null, user)
  }
  catch(err) {
    console.log(err)
    return done(null, false, { message: err.message })
  }
}

// menggunakan local stategy untuk autentikasi
passport.use(
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, authenticate)
)

// membuat session
passport.serializeUser(
  (user, done) => done(null, user.id)
)

// menghapus session
passport.deserializeUser(
  async (id, done) => done(null, await Users.findByPk(id))
)

module.exports = passport