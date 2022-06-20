'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Certificates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  
  Certificates.init({
    transID: DataTypes.STRING,
    file: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Certificates',
  });
  return Certificates;
};