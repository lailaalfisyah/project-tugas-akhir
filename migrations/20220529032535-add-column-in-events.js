'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Events', 'dateStart', Sequelize.DATEONLY, {
      after: 'title'
    }),

    await queryInterface.addColumn('Events', 'dateEnd', Sequelize.DATEONLY, {
      after: 'dateStart'
    }),

    await queryInterface.addColumn('Events', 'timeStart', Sequelize.TIME, {
      after: 'dateEnd'
    }),

    await queryInterface.addColumn('Events', 'timeEnd', Sequelize.TIME, {
      after: 'timeStart'
    }),

    await queryInterface.removeColumn('Events', 'date')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Events', 'dateStart'),

    await queryInterface.removeColumn('Events', 'dateEnd'),

    await queryInterface.removeColumn('Events', 'timeStart'),

    await queryInterface.removeColumn('Events', 'timeEnd'),

    await queryInterface.addColumn('Events', 'date', Sequelize.DATEONLY, {
      after: 'title'
    })
  }
};
