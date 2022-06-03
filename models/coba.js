'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coba extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static findData() {
      return this.max('id').then(data => res.status(200).json(data))
    }

    static inputCustomId({ id, content }) {
      let kode = ''
    }
  };

  Coba.init({
    // id: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Coba',
  });
  return Coba;
};