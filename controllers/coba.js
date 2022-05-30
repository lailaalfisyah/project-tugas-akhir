const { Events } = require('../models')

module.exports = {
  inputForm: (req, res) => {
    res.render('coba/inputEvent')
  },

  inputProcess: (req, res) => {
    Events.create({
      token: req.body.token,
      title: req.body.title,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      timeStart: req.body.timeStart,
      timeEnd: req.body.timeEnd,
      price: req.body.price
    })
      .then(data => res.status(200).json(data))
  },

  output: (req, res) => {
    Events.findAll().then(data => {
      res.render('coba/outputEvent', {data})
    })
  }
}