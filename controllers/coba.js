const { Events, Coba, Transactions, Users } = require('../models')
const dateAndTime = require('date-and-time')
const Sequelize = require('sequelize')
const fs = require('fs')

module.exports = {
  click: (req, res) => {
    res.render('coba/certif')
  },

  openCertif: (req, res) => {
    let data = fs.readFileSync('views/coba/hasilcertif7.pdf')
    res.contentType('application/pdf')
    res.send(data)
  }
}