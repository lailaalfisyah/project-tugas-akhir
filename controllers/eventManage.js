const { Events, Transactions, Users } = require('../models')

module.exports = {
  eventList: (req, res) => {
    Events.findAll()
      .then(data => res.render('management/eventList', { data }))
  },

  eventDetail: (req, res) => {
    Events.findOne({
      where: { id: req.params.id }
    })
      .then(data => res.render('management/eventDetail', { data }))
  },

  eventRegistration: (req, res) => {
    Transactions.create({
      userID: req.user.id,
      eventID: req.params.id
    })
      .then(data => res.status(200).json(data))
  },

  transationProof: (req, res) => {
    Transactions.findOne({
      where: { id: req.params.id }
    })
      .then(data => res.status(200).json(data))
  },

  matchTheToken: (req, res) => {
    Events.matchToken(req.body)
      .then(data => res.status(200).json(data))
  },



  // ONLY FOR ADMIN

  inputEventForm: (req, res) => {
    res.render('management/inputEvent')
  },

  inputEventProcess: (req, res) => {
    Events.inputEvent(req.body)
      .then(() => res.redirect('/outputEvent'))
  },

  transactionsReport: (req, res) => {
    Transactions.findAll({
      include: [{
        model: Events,
        required: true
      }, {
        model: Users,
        required: true
      }]
    })
      .then(data => res.render('management/adminReport', { data }))
  }
}