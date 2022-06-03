const { Events, Transactions } = require('../models')

module.exports = {
  inputForm: (req, res) => {
    res.render('management/inputEvent')
  },

  inputProcess: (req, res) => {
    Events.inputEvent(req.body)
      .then(() => res.redirect('/outputEvent'))
  },

  output: (req, res) => {
    Events.findAll()
      .then(data => res.render('management/outputEvent', { data }))
  },

  detail: (req, res) => {
    Events.findOne({
      where: { id: req.params.id }
    })
      .then(data => res.render('management/detailEvent', { data }))
  },

  registration: (req, res) => {
    Transactions.create({
      userID: req.user.id,
      eventID: req.params.id
    })
      .then(data => res.status(200).json(data))
  },

  matchTheToken: (req, res) => {
    Events.matchToken(req.body)
      .then(data => res.status(200).json(data))
  }
}