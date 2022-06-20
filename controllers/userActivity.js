const { Events, Transactions, Users, General } = require('../models')
const pdf = require('html-pdf')
const fs = require('fs')

module.exports = {
  // home: (req, res) => {
  //   Events.findAll()
  //     .then(data => res.render('home', { data }))
  // },

  eventList: (req, res) => {
    Events.findAll()
      .then(data => res.render('userActivity/eventList', {
        data,
        user: req.user.dataValues
      }))
  },

  eventDetail: (req, res) => {
    Events.findOne({
      where: { id: req.params.id }
    })
      .then(data => res.render('userActivity/eventDetail', {
        data,
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
        data,
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
          res.json('Invalid Token!')
        } else {
          const ejs = `<div id="capture" style="padding: 10px; background: #f5da55">
            <h4 style="color: #000; ">Hello world! ${data.Event.title}</h4>
          </div>`

          const options = {
            format: 'A4',
            orientation: 'landscape'
          }

          pdf.create(ejs, options).toFile('assets/certificates/mycertif.pdf', (err, data) => {
            if (err) return console.log(err)
            // console.log(data)

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
      .then(data => res.render('userActivity/profile', {
        data,
        user: req.user.dataValues
      }))
  },

  editProfileForm: (req, res) => {
    Users.findOne({
      where: { id: req.user.id }
    })
      .then(data => res.render('userActivity/editProfile', {
        data,
        user: req.user.dataValues
      }))
  },

  editProfileProcess: (req, res) => {
    Users.updateProfile(req.user.id, req.body)
      .then(() => res.redirect('/profile'))
  }
}