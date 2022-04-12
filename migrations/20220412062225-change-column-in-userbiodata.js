'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('UserBiodata', 'username', {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('UserBiodata', 'username', {
      type: Sequelize.STRING
    });
  }
};
