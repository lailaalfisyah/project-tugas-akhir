const { Events, Transactions, Users, General } = require('../models')
const dateAndTime = require('date-and-time')
const pdf = require('html-pdf')
const fs = require('fs')
const Mustache = require('mustache')
const path = require('path')

module.exports = {
  home: (req, res) => {
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

        res.render('userActivity/home', {
          title: 'HOME | Event List',
          data,
          convertedDate,
          convertedTimeStart,
          convertedTimeEnd
        })
      })
  },

  eventList: (req, res) => {
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

        res.render('userActivity/eventList', {
          title: 'HOME | Event List',
          data,
          convertedDate,
          convertedTimeStart,
          convertedTimeEnd,
          user: req.user.dataValues
        })
      })
  },

  eventDetail: (req, res) => {
    Events.findOne({
      where: { id: req.params.id }
    })
      .then(data => res.render('userActivity/eventDetail', {
        title: 'Event Detail',
        data,
        convertedDate: dateAndTime.transform(data.date, 'YYYY-MM-DD', 'dddd, DD MMMM YYYY'),
        convertedTimeStart: dateAndTime.transform(data.timeStart, 'HH:mm:ss', 'HH.mm [WIB]'),
        convertedTimeEnd: dateAndTime.transform(data.timeEnd, 'HH:mm:ss', 'HH.mm [WIB]'),
        user: req.user.dataValues
      }))
  },

  eventRegistration: (req, res) => {
    General.customID('T', Transactions)
      .then(customizedID => {
        Transactions.create({
          id: customizedID,
          userID: req.user.id,
          eventID: req.params.id
        })
          .then(data => res.redirect(`/transactionProof/${data.id}`))
      })   
  },

  transactionProof: (req, res) => {
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
      .then(data => res.render('userActivity/transactionProof', {
        title: 'Transaction Proof',
        data,
        convertedEventDate: dateAndTime.transform(data.Event.date, 'YYYY-MM-DD', 'dddd, DD MMMM YYYY'),
        convertedTimeStart: dateAndTime.transform(data.Event.timeStart, 'HH:mm:ss', 'HH.mm [WIB]'),
        convertedTimeEnd: dateAndTime.transform(data.Event.timeEnd, 'HH:mm:ss', 'HH.mm [WIB]'),
        user: req.user.dataValues
      }))
  },

  matchTheToken: (req, res) => {
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
      .then(data => {
        if (req.body.token !== data.Event.token) {
          // res.json('Invalid Token!')
          const id = req.params.id
          console.log(id)
          req.flash('error', 'Invalid Token!')
          res.redirect(`/transactionProof/${id}`)
        } else {
          let ejs = fs.readFileSync('views/documents/certificate.ejs', 'utf-8')
          let output = Mustache.render(ejs, {
            data,
            convertedEventDate: dateAndTime.transform(data.Event.date, 'YYYY-MM-DD', 'dddd, DD MMMM YYYY')
          })

          const options = {
            format: 'A4',
            orientation: 'landscape'
          }

          pdf.create(output, options).toFile('public/assets/documents/certificate.pdf', (err, data) => {
            if (err) return console.log(err)
            let certif = fs.readFileSync(data.filename)
            res.contentType('application/pdf')
            res.send(certif)
          })
        }
      })
  },

  profile: (req, res) => {
    Transactions.findAll({
      where: { userID: req.user.id },
      include: [{
        model: Events,
        required: true
      }],
      order: [
        ['updatedAt', 'DESC']
      ]
    })
      .then(data => {
        res.render('userActivity/profile', {
          title: 'My Profile',
          data,
          convertedDate: dateAndTime.transform(req.user.birthDate, 'YYYY-MM-DD', 'DD MMMM YYYY'),
          user: req.user.dataValues
        })
      })
  },

  editProfileForm: (req, res) => {
    Users.findOne({
      where: { id: req.user.id }
    })
      .then(data => res.render('userActivity/editProfile', {
        title: 'Edit Profile',
        data,
        user: req.user.dataValues
      }))
  },

  editProfileProcess: (req, res) => {
    Users.updateProfile(req.user.id, req.body)
      .then(() => res.redirect('/profile'))
  },

  editProfilePicture: (req, res) => {
    Users.updateProfilePicture(req.user.id, req.file.filename)
      .then(() => res.redirect('/editProfile'))
  }
}