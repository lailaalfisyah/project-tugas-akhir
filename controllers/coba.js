const { Events, Coba, Transactions, Users } = require('../models')
const dateAndTime = require('date-and-time')
const Sequelize = require('sequelize')
const fs = require('fs')

module.exports = {
  countDate: (req, res) => {
    let now = new Date()
    let date = dateAndTime.format(now, 'DD MMM YYYY - HH:mm:ss')
    console.log(now)
    console.log(date)
    res.end()
  }
}