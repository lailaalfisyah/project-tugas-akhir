'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Certificates', {
      certifID: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      transID: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Transactions',
          key: 'transID'
        }
      },
      file: {
        type: Sequelize.BLOB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Certificates');
  }
};