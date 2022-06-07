'use strict';
const { Model, Op } = require('sequelize')
const dateAndTime = require('date-and-time')

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

    static inputDataWithCustomId() {
      const acronym = 'C'
      const now = new Date()
      const year = dateAndTime.format(now, 'YY')

      this.removeAttribute('id')

      return this.count({
        where: { 
          cobaID: {
            [Op.like]: `%${year}%`
          } 
        }
      }).then(data => {
        data += 1
        data = data.toString()
        
        if (data.length == 3) data = `0${data}`
        if (data.length == 2) data = `00${data}`
        if (data.length == 1) data = `000${data}`

        this.create({
          cobaID: `${acronym}${year}-${data}`,
          content: 'coba terus'
        })         
      })
    }
  };

  Coba.init({
    cobaID: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Coba',
  });
  return Coba;
};