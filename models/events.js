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

    static inputEvent = (id, { token, title, date, timeStart, timeEnd, desc }) => {
      return this.create({
        id,
        token,
        title,
        date,
        timeStart,
        timeEnd,
        desc
      })
    }

    static updateEvent = (id, { token, title, date, timeStart, timeEnd, desc }) => {
      return this.update({
        token,
        title,
        date,
        timeStart,
        timeEnd,
        desc
      }, {
        where: {
          id
        }
      })
    }
  };

  Events.init({
    token: DataTypes.STRING,
    title: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    timeStart: DataTypes.TIME,
    timeEnd: DataTypes.TIME,
    desc: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Events',
  });
  return Events;
};