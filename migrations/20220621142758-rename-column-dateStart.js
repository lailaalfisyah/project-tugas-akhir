'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Events', 'dateStart', 'date')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Events', 'date', 'dateStart')
  }
};
