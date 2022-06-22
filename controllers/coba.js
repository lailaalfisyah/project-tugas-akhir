const { Events, Coba, Transactions, Users } = require('../models')
const dateAndTime = require('date-and-time')
const Sequelize = require('sequelize')
const fs = require('fs')

module.exports = {
  convertDateTime: (req, res) => {
    Events.findOne({
      where: { id: 'E22-0001' }
    })
      .then(data => {
        res.render('adminDashboard/eventDetail', {
          data,
          convertDate: dateAndTime.transform(data.date, 'YYYY-MM-DD', 'dddd, DD MMMM YYYY')
        })
      })
  },

  convertDatesTimes: (req, res) => {
    Events.findAll()
      .then(data => {
        let convertedDate = []

        data.forEach(i => {
          convertDate = dateAndTime.transform(i.dataValues.date, 'YYYY-MM-DD', 'dddd, DD MMMM YYYY')
          convertedDate.push(convertDate)
          console.log(convertDate)
        })

        res.render('adminDashboard/eventData', {
          data,
          convertedDate
        })
      })
  },
  
  doubleForLoop: (req, res) => {
    let data = [
      {
        id: 'E22-0001',
        title: 'Event ke-1'
      },
      {
        id: 'E22-0002',
        title: 'Event ke-2'
      }
    ]

    for (let i = 0; i < data.length; i++) {
      const element = data[i].id;
      console.log(element)
    }
  }
}