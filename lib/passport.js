const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { UserBiodata } = require('../models')

// menjalankan proses autentikasi user
authenticate = async (username, password, done) => {
  try {
    const user = await UserBiodata.authenticate({ username, password })

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
  async (id, done) => done(null, await UserBiodata.findByPk(id))
)

module.exports = passport