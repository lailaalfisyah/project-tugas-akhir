'use strict';
const { Model, Op } = require('sequelize');
const dateAndTime = require('date-and-time');

module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static inputEvent = (id, { token, title, dateStart, timeStart, timeEnd, price, desc }) => {
      let ds = dateAndTime.transform(dateStart, 'YYYY-MM-DD', 'dddd, DD MMMM YYYY')
      let ts = dateAndTime.transform(timeStart, 'HH:mm:ss', 'HH:mm [WIB]')
      let te = dateAndTime.transform(timeEnd, 'HH:mm:ss', 'HH:mm [WIB]')

      return this.create({
        id,
        token,
        title,
        dateStart: ds,
        timeStart: ts,
        timeEnd: te,
        price,
        desc
      })
    }
  };

  Events.init({
    token: DataTypes.STRING,
    title: DataTypes.STRING,
    dateStart: DataTypes.STRING,
    dateEnd: DataTypes.STRING,
    timeStart: DataTypes.STRING,
    timeEnd: DataTypes.STRING,
    price: DataTypes.INTEGER,
    desc: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Events',
  });
  return Events;
};