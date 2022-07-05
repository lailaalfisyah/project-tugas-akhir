const { Users, Roles, General } = require('../models')
const passport = require('../lib/passport')

module.exports = {
  registerForm: (req, res) => {
    res.render('auth/register')
  },

  registerProcess: (req, res, next) => {
    General.customID('U', Users)
      .then(customizedID => {
        Users.register(customizedID, req.body, 2)
          .then(() => res.redirect('/login'))
          .catch(err => next(err))
      })    
  },

  loginForm: (req, res) => {
    res.render('auth/login')
  },

  loginProcess: passport.authenticate('local', {
    successRedirect: '/roleDetector',
    failureRedirect: '/login',
    failureFlash: true
  }),

  roleDetector: (req, res) => {
    if (req.user.roleID == 1) {
      res.redirect('/admin')
    }

    if (req.user.roleID == 2) {
      res.redirect('/event')
    }
  },

  logoutProcess: (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to logout')
        } else {
          res.redirect('/login')
        }
      })
    } else {
      res.end()
    }
  },

  // JUST DEMO

  inputRole: (req, res) => {
    Roles.create({
      desc: req.body.desc
    })
      .then(data => res.status(200).json(data))
  },

  registerAdmin: (req, res, next) => {
    General.customID('U', Users)
      .then(customizedID => {
        Users.register(customizedID, req.body, 1)
          .then(() => res.redirect('/login'))
          .catch(err => next(err))
      })    
  }
}