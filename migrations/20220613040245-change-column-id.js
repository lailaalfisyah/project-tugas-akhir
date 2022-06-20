'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('certificates', 'certifID', 'id')
    await queryInterface.renameColumn('events', 'eventID', 'id')
    await queryInterface.renameColumn('roles', 'roleID', 'id')
    await queryInterface.renameColumn('transactions', 'transID', 'id')
    await queryInterface.renameColumn('users', 'userID', 'id')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('certificates', 'id', 'certifID')
    await queryInterface.renameColumn('events', 'id', 'eventID')
    await queryInterface.renameColumn('roles', 'id', 'roleID')
    await queryInterface.renameColumn('transactions', 'id', 'transID')
    await queryInterface.renameColumn('users', 'id', 'userID')
  }
};
