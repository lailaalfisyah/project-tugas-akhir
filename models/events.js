'use strict';
const { Model } = require('sequelize');
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

    static inputEvent = ({ token, title, dateStart, dateEnd, timeStart, timeEnd, price }) => {
      let ds = dateAndTime.transform(dateStart, 'YYYY-MM-DD', 'dddd, DD MMMM YYYY')
      let de = dateAndTime.transform(dateEnd, 'YYYY-MM-DD', 'dddd, DD MMMM YYYY')
      let ts = dateAndTime.transform(timeStart, 'HH:mm:ss', 'HH:mm [WIB]')
      let te = dateAndTime.transform(timeEnd, 'HH:mm:ss', 'HH:mm [WIB]')

      if (!dateEnd) {
        de = ''
      }

      return this.create({
        token,
        title,
        dateStart: ds,
        dateEnd: de,
        timeStart: ts,
        timeEnd: te,
        price
      })
    }

    static matchToken = async ({ token }) => {
      try {
        const isTokenMatch = await this.findOne({
          where: { token }
        })
  
        if (!isTokenMatch) return Promise.reject('Invalid token!')
        return Promise.resolve('Congratulations! You got the certificate.')
      }
      catch(err) {
        return Promise.reject(err)
      }
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
  }, {
    sequelize,
    modelName: 'Events',
  });
  return Events;
};