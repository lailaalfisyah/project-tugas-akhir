const { Events, Transactions, Users, General } = require('../models')
const { Op } = require('sequelize')
const dateAndTime = require('date-and-time');
const year = dateAndTime.format(new Date(), 'YY')
const containsThisYear = { [Op.like]: `%${year}%` }

module.exports = {
  eventList: (req, res) => {
    Events.removeAttribute('id')
    Events.findAll()
      .then(data => res.render('management/eventList', { data }))
  },

  eventDetail: (req, res) => {
    Events.removeAttribute('id')
    Events.findOne({
      where: { eventID: req.params.id }
    })
      .then(data => res.render('management/eventDetail', { data }))
  },

  eventRegistration: (req, res) => {
    General.customID('T', Transactions, { transID: containsThisYear })
      .then(customizedID => {
        Transactions.create({
          transID: customizedID,
          userID: req.user.userID,
          eventID: req.params.id
        })
          .then(data => res.status(200).json(data))
      })   
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
    General.customID('E', Events, { eventID: containsThisYear })
      .then(customizedID => {
        Events.inputEvent(customizedID, req.body)
          .then(() => res.redirect('/'))
      })
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