'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Events', 'coba', Sequelize.DATEONLY, {
      after: 'title'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Events', 'coba')
  }
};
