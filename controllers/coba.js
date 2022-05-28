const { Events } = require('../models')

module.exports = {
  inputForm: (req, res) => {
    res.render('coba/inputEvent')
  },

  inputProcess: (req, res) => {
    Events.create({
      token: req.body.token,
      type: req.body.type,
      title: req.body.title,
      date: req.body.date,
      location: req.body.location,
      price: req.body.price
    })
      .then(data => res.status(200).json(data))
  }
}