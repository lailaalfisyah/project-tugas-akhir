'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Events', 'poster', Sequelize.STRING, {
      after: 'id'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Events', 'poster')
  }
};
