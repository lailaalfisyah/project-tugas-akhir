const { Users, Roles, General } = require('../models')
const passport = require('../lib/passport')
const { Op } = require('sequelize')
const dateAndTime = require('date-and-time');
const year = dateAndTime.format(new Date(), 'YY')
const containsThisYear = { [Op.like]: `%${year}%` }

module.exports = {
  registerForm: (req, res) => {
    res.render('auth/register')
  },

  registerProcess: (req, res, next) => {
    General.customID('U', Users, { userID: containsThisYear})
      .then(customizedID => {
        Users.register(customizedID, req.body, req.body.roleID)
          // .then(data => res.status(200).json(data))
          .then(() => res.redirect('/login'))
          .catch(err => next(err))
      })    
  },

  loginForm: (req, res) => {
    res.render('auth/login')
  },

  loginProcess: passport.authenticate('local', {
    successRedirect: '/',
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

  // JUST DEMO

  inputRole: (req, res) => {
    Roles.removeAttribute('id')
    
    Roles.create({
      desc: req.body.desc
    })
      .then(data => res.status(200).json(data))
  }
}