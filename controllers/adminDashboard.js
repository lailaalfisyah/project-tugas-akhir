const { Events, Transactions, Users, General } = require('../models')
const dateAndTime = require('date-and-time')
const pdf = require('html-pdf')
const fs = require('fs')
const Mustache = require('mustache')
const { Op } = require('sequelize')

module.exports = {
  dashboard: (req, res) => {
    Users.count().then(countUsers => {
      Events.count().then(countEvents => {
        Transactions.count().then(countTransactions => {
          res.render('adminDashboard/dashboard', {
            title: 'Admin Dashboard',
            countUsers,
            countEvents,
            countTransactions
          })
        })
      })
    })   
  },

  userData: (req, res) => {
    Users.findAll()
      .then(data => {
        res.render('adminDashboard/userData', {
          title: 'User Data',
          data
        })
      })
  },

  userDetail: (req, res) => {
    Users.findOne({
      where: { id: req.params.id }
    })
      .then(data => res.render('adminDashboard/userDetail', {
        title: 'User Detail',
        data,
        convertedDate: dateAndTime.transform(data.birthDate, 'YYYY-MM-DD', 'DD MMMM YYYY')
      }))
  },

  searchUser: (req, res) => {
    let { keyword } = req.query

    Users.findAll({
      where: {
        [Op.or]: {
          id: {
            [Op.like]: `%${keyword}%`
          },
          username: {
            [Op.like]: `%${keyword}%`
          },
          fullName: {
            [Op.like]: `%${keyword}%`
          },
          email: {
            [Op.like]: `%${keyword}%`
          },
          gender: {
            [Op.like]: `%${keyword}%`
          }
        }
      }
    })
      .then(data => res.render('adminDashboard/userData', { 
        title: 'User Data',
        data 
      }))
  },

  eventData: (req, res) => {
    Events.findAll()
      .then(data => {
        let convertedDate = []

        data.forEach(i => {
          convertDate = dateAndTime.transform(i.date, 'YYYY-MM-DD', 'dddd, DD MMMM YYYY')
          convertedDate.push(convertDate)
        })

        res.render('adminDashboard/eventData', {
          title: 'Event Data',
          data,
          convertedDate
        })
      })       
  },

  eventDetail: (req, res) => {
    Events.findOne({
      where: { id: req.params.id }
    })
      .then(data => res.render('adminDashboard/eventDetail', {
        title: 'Event Detail',
        data,
        convertedDate: dateAndTime.transform(data.date, 'YYYY-MM-DD', 'dddd, DD MMMM YYYY'),
        convertedTimeStart: dateAndTime.transform(data.timeStart, 'HH:mm:ss', 'HH.mm [WIB]'),
        convertedTimeEnd: dateAndTime.transform(data.timeEnd, 'HH:mm:ss', 'HH.mm [WIB]')
      }))
  },

  searchEvent: (req, res) => {
    let { keyword } = req.query

    Events.findAll({
      where: {
        [Op.or]: {
          id: {
            [Op.like]: `%${keyword}%`
          },
          token: {
            [Op.like]: `%${keyword}%`
          },
          title: {
            [Op.like]: `%${keyword}%`
          },
          date: {
            [Op.like]: `%${keyword}%`
          }
        }
      }
    })
      .then(data => {
        let convertedDate = []

        data.forEach(i => {
          convertDate = dateAndTime.transform(i.date, 'YYYY-MM-DD', 'dddd, DD MMMM YYYY')
          convertedDate.push(convertDate)
        })

        res.render('adminDashboard/eventData', {
          title: 'Event Data',
          data,
          convertedDate
        })
      })
  },

  inputEventForm: (req, res) => {
    res.render('adminDashboard/inputEvent', {
      title: 'Input Event',
    })
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
        title: 'Edit Event',
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
          title: 'Transaction Data',
          data
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
        title: 'Transaction Detail',
        data, 
        convertedEventDate: dateAndTime.transform(data.Event.date, 'YYYY-MM-DD', 'dddd, DD MMMM YYYY'),
        convertedTimeStart: dateAndTime.transform(data.Event.timeStart, 'HH:mm:ss', 'HH.mm [WIB]'),
        convertedTimeEnd: dateAndTime.transform(data.Event.timeEnd, 'HH:mm:ss', 'HH.mm [WIB]')
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

        pdf.create(output, options).toFile('public/assets/documents/transactionReport.pdf', (err, data) => {
          if (err) return console.log(err)
          let report = fs.readFileSync(data.filename)
          res.contentType('application/pdf')
          res.send(report)
        })
      })
  }
}