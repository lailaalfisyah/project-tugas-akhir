const { Events, Coba, Transactions, Users } = require('../models')
const dateAndTime = require('date-and-time')
const Sequelize = require('sequelize')
const fs = require('fs')
const pdf = require('html-pdf')

// const Op = Sequelize.Op

module.exports = {
  customID: (req, res) => {
    Events.customID()
      .then(id => {
        Events.inputEvent(id, req.body)
          .then(data => res.status(200).json(data))
      })
  },

  certif: (req, res) => {    
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

  adminReport: (req, res) => {
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
  },

  findMax: (req, res) => {
    Events.max('token').then(data => res.status(200).json(data))
  },

  count: (req, res) => {
    // Events.count({
    //   where: { 
    //     token: {
    //       [Sequelize.Op.like]: 'lagi%'
    //     } 
    //   }
    // })

    // Events.count({
    //   where: { 
    //     dateStart: {
    //       [Sequelize.Op.lte]: 2022
    //     } 
    //   }
    // })

    Events.hitung()
      .then(data => res.status(200).json(data))
  },
  
  tryToConsole: (req, res) => {
    Coba.inputDataWithCustomId()
      .then(data => res.status(200).json(data))
  },

  // MERESET DEFAULT ID
  // removeDefaultId: (req, res) => {
  //   Coba.removeAttribute('id')
  // },

  addRecord: (req, res) => {
    Coba.create({
      id: 'C22-1',
      content: 'Cobain 1'
    })
      .then(data => res.status(200).json(data))
  }
}