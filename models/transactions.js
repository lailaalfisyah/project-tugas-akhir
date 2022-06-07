'use strict';
const { Model } = require('sequelize')
const dateAndTime = require('date-and-time');

module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transactions.belongsTo(models.Events);
      models.Events.hasMany(Transactions);

      Transactions.belongsTo(models.Users);
      models.Users.hasMany(Transactions);
    }

    static customID(acronym, theModel, { tableID }) {
      const year = dateAndTime.format(new Date(), 'YY')

      return theModel.count({
        where: tableID
      }).then(data => {
        data += 1
        data = data.toString()
        
        if (data.length == 3) data = `0${data}`
        if (data.length == 2) data = `00${data}`
        if (data.length == 1) data = `000${data}`
        
        return `${acronym}${year}-${data}` 
      })
    }
  };
  Transactions.init({
    transID: DataTypes.STRING,
    userID: DataTypes.INTEGER,
    eventID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};