'use strict';
const {
  Model
} = require('sequelize');
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
  };
  Transactions.init({
    userID: DataTypes.INTEGER,
    eventID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};