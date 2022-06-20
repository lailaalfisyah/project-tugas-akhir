const { Events, Transactions, Users, General } = require('../models')
const pdf = require('html-pdf')

module.exports = {
  home: (req, res) => {
    Events.findAll()
      .then(data => res.render('home', { data }))
  },

  eventList: (req, res) => {
    Events.findAll()
      .then(data => res.render('management/eventList', {
        data,
        user: req.user.dataValues
      }))
  },

  eventDetail: (req, res) => {
    Events.findOne({
      where: { id: req.params.id }
    })
      .then(data => res.render('management/eventDetail', {
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
          res.json('Congratulations! You got the certificate.')
        }
      })
  },

  generateCertif: (req, res) => {    
    Events.findOne({
      where: { id: 1 }
    })
      .then(data => {
        const ejs = `<div id="capture" style="padding: 10px; background: #f5da55">
          <h4 style="color: #000; ">Hello world! ${data.title}</h4>
        </div>`

        const options = {
          format: 'A4',
          orientation: 'landscape'
        }

        res.render('management/detailEvent', { data })
        pdf.create(ejs, options).toFile('views/coba/hasilcertif7.pdf', (err, data) => {
          if (err) return console.log(err)
          console.log(data)
        })
      })
  },



  // ONLY FOR ADMIN

  dashboard: (req, res) => {
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
      .then(data => res.render('management/transactionsReport', {
        data, 
        // user: req.user.dataValues
      }))
  },

  eventsData: (req, res) => {
    Events.findAll()
      .then(data => res.render('management/eventsData', {
        data
      }))
  },

  inputEventForm: (req, res) => {
    res.render('management/inputEvent')
  },

  inputEventProcess: (req, res) => {
    General.customID('E', Events)
      .then(customizedID => {
        Events.inputEvent(customizedID, req.body)
          .then(() => res.redirect('/eventsData'))
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
      .then(data => {
        let ejs = '<div id="capture" style="padding: 10px; background: #f5da55">'
        data.forEach(i => {
          ejs += '<h4 style="color: #000; ">Hello world! ' + i.Event.title + '</h4>'
        })
        ejs += '</div>'

        const options = {
          format: 'A4',
          orientation: 'potrait'
        }

        res.render('management/adminReport', { data })
        pdf.create(ejs, options).toFile('views/coba/hasilcertif7.pdf', (err, data) => {
          if (err) return console.log(err)
          console.log(data)
        })
      })
  }
}