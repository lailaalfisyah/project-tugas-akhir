const { Events } = require('../models')
const dateAndTime = require('date-and-time')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  certif: (req, res) => {
    res.render('coba/certif')
  },

  findMax: (req, res) => {
    Events.max('token').then(data => res.status(200).json(data))
  },

  count: (req, res) => {
    Events.count({
      where: { 
        title: {
          [Op.like]: 'Percobaan%'
        } 
      }
    })
      .then(data => res.status(200).json(data))
  }
}