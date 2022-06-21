'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Events', 'price')
    await queryInterface.removeColumn('Events', 'dateEnd')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Events', 'price', Sequelize.INTEGER)
    await queryInterface.addColumn('Events', 'dateEnd', Sequelize.STRING)
  }
};
