'use strict';
const { Model, Op } = require('sequelize')
const dateAndTime = require('date-and-time');

module.exports = () => {
  class General extends Model {   
    static customID(acronym, theModel) {
      const year = dateAndTime.format(new Date(), 'YY')

      return theModel.count({
        where: {
          id: {
            [Op.like]: `%${year}%`
          }
        }
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

  return General;
};