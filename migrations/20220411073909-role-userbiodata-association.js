'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('UserBiodata', {
      fields: ['roleID'],
      type: 'foreign key',
      name: 'role_userbiodata_association',
      references: {
        table: 'Roles',
        field: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('UserBiodata', {
      fields: ['roleID'],
      type: 'foreign key',
      name: 'role_userbiodata_association',
      references: {
        table: 'Roles',
        field: 'id'
      }
    });
  }
};
