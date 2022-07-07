const { Events, Transactions, Users, General } = require('../models')
const dateAndTime = require('date-and-time')
const pdf = require('html-pdf')
const fs = require('fs')
const Mustache = require('mustache')

module.exports = {
  dashboard: (req, res) => {
    // isi dengan count/perhitungan dari berbagai models
    // letakkan saja hal-hal yang sekiranya pantas dipajang di dasbor
    // contohnya jumlah users, events, transactions, dan total penghasilan
    
    res.render('adminDashboard/dashboard')
  },

  userData: (req, res) => {
    Users.findAll()
      .then(data => {
        res.render('adminDashboard/userData', {
          data
        })
      })
  },

  userDetail: (req, res) => {
    Users.findOne({
      where: { id: req.params.id }
    })
      .then(data => res.render('adminDashboard/userDetail', {
        data,
        convertedDate: dateAndTime.transform(data.birthDate, 'YYYY-MM-DD', 'DD MMMM YYYY')
      }))
  },

  eventData: (req, res) => {
    Events.findAll()
      .then(data => {
        let convertedDate = []
        let convertedTimeStart = []
        let convertedTimeEnd = []

        data.forEach(i => {
          convertDate = dateAndTime.transform(i.date, 'YYYY-MM-DD', 'dddd, DD MMMM YYYY')
          convertTimeStart = dateAndTime.transform(i.timeStart, 'HH:mm:ss', 'HH.mm [WIB]')
          convertTimeEnd = dateAndTime.transform(i.timeEnd, 'HH:mm:ss', 'HH.mm [WIB]')

          convertedDate.push(convertDate)
          convertedTimeStart.push(convertTimeStart)
          convertedTimeEnd.push(convertTimeEnd)
        })

        res.render('adminDashboard/eventData', {
          data,
          convertedDate,
          convertedTimeStart,
          convertedTimeEnd
        })
      })       
  },

  eventDetail: (req, res) => {
    Events.findOne({
      where: { id: req.params.id }
    })
      .then(data => res.render('adminDashboard/eventDetail', {
        data,
        convertedDate: dateAndTime.transform(data.date, 'YYYY-MM-DD', 'dddd, DD MMMM YYYY'),
        convertedTimeStart: dateAndTime.transform(data.timeStart, 'HH:mm:ss', 'HH.mm [WIB]'),
        convertedTimeEnd: dateAndTime.transform(data.timeEnd, 'HH:mm:ss', 'HH.mm [WIB]')
      }))
  },

  inputEventForm: (req, res) => {
    res.render('adminDashboard/inputEvent')
  },

  inputEventProcess: (req, res) => {
    General.customID('E', Events)
      .then(customizedID => {
        Events.inputEvent(customizedID, req.body, req.file.filename)
          .then(() => res.redirect('/admin/eventData'))
      })
  },

  editEventForm: (req, res) => {
    Events.findOne({
      where: { id: req.params.id }
    })
      .then(data => res.render('adminDashboard/editEvent', {
        data
      }))
  },

  editEventProcess: (req, res) => {
    Events.updateEvent(req.params.id, req.body)
      .then(() => res.redirect('/admin/eventData'))
  },

  editEventPoster: (req, res) => {
    Events.updateEventPoster(req.params.id, req.file.filename)
      .then(() => res.redirect('/admin/eventData'))
  },

  transactionData: (req, res) => {
    Transactions.findAll({
      include: [{
        model: Events,
        required: true
      }, {
        model: Users,
        required: true
      }],
      order: [
        ['id', 'DESC']
      ]
    })
      .then(data => {
        res.render('adminDashboard/transactionData', {
          data
          // user: req.user.dataValues
        })
      })
  },

  transactionDetail: (req, res) => {
    Transactions.findOne({
      where: { id: req.params.id },
      include: [{
        model: Events,
        required: true
      }, {
        model: Users,
        required: true
      }]
    })
      .then(data => res.render('adminDashboard/transactionDetail', {
        data, 
        convertedEventDate: dateAndTime.transform(data.Event.date, 'YYYY-MM-DD', 'dddd, DD MMMM YYYY'),
        convertedTimeStart: dateAndTime.transform(data.Event.timeStart, 'HH:mm:ss', 'HH.mm [WIB]'),
        convertedTimeEnd: dateAndTime.transform(data.Event.timeEnd, 'HH:mm:ss', 'HH.mm [WIB]')
        // user: req.user.dataValues
      }))
  },

  transactionReport: (req, res) => {
    Transactions.findAll({
      include: [{
        model: Events,
        required: true
      }, {
        model: Users,
        required: true
      }],
      order: [
        ['id', 'DESC']
      ],
      limit: 15
    })
      .then(data => {
        let ejs = fs.readFileSync('views/documents/transactionReport.ejs', 'utf-8')
        let output = Mustache.render(ejs, { data })

        const options = {
          format: 'A4',
          orientation: 'potrait'
        }

        pdf.create(output, options).toFile('assets/documents/transactionReport.pdf', (err, data) => {
          if (err) return console.log(err)
          let report = fs.readFileSync(data.filename)
          res.contentType('application/pdf')
          res.send(report)
        })
      })
  }
}