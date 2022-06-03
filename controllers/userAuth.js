const { Users, Roles } = require('../models')
const passport = require('../lib/passport')

module.exports = {
  registerForm: (req, res) => {
    res.render('auth/register')
  },

  registerProcess: (req, res, next) => {
    Users.register(req.body, req.body.roleID)
      // .then(data => res.status(200).json(data))
      .then(() => res.redirect('/login'))
      .catch(err => next(err))
  },

  loginForm: (req, res) => {
    res.render('auth/login')
  },

  loginProcess: passport.authenticate('local', {
    successRedirect: '/whoami',
    failureRedirect: '/login',
    failureFlash: true
  }),

  logoutProcess: (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to logout')
        } else {
          res.send('Logout successful')
        }
      })
    } else {
      res.end()
    }
  },

  // hanya untuk demo
  inputRole: (req, res) => {
    Roles.create({
      desc: req.body.desc
    })
      .then(data => res.status(200).json(data))
  }
}