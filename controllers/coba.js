const { Events, Coba, Transactions, Users, General } = require('../models')
const dateAndTime = require('date-and-time')
const Sequelize = require('sequelize')
const fs = require('fs')
const jsdom = require('jsdom')
const { Op } = require('sequelize')

module.exports = {
  test: (req, res) => {
    Users.changePassword(req.user, req.body)
      .then(data => res.status(200).json(data))
  }
}