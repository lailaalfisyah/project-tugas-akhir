'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('UserBiodata', 'email', Sequelize.STRING, {
      after: 'gender'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('UserBiodata', 'email', Sequelize.STRING, {
      after: 'gender'
    })
  }
};
