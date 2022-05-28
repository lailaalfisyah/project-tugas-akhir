'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Certificates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Transactions',
          key: 'id'
        }
      },
      certifNumber: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
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