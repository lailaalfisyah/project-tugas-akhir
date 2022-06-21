'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Events', 'date', {
      type: Sequelize.DATEONLY
    })

    await queryInterface.changeColumn('Events', 'timeStart', {
      type: Sequelize.TIME
    })

    await queryInterface.changeColumn('Events', 'timeEnd', {
      type: Sequelize.TIME
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Events', 'date', {
      type: Sequelize.STRING
    })

    await queryInterface.changeColumn('Events', 'timeStart', {
      type: Sequelize.STRING
    })

    await queryInterface.changeColumn('Events', 'timeEnd', {
      type: Sequelize.STRING
    })
  }
};
