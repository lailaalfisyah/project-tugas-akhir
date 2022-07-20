'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.CHAR(8)
      },
      userID: {
        allowNull: false,
        type: Sequelize.CHAR(8),
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      eventID: {
        allowNull: false,
        type: Sequelize.CHAR(8),
        references: {
          model: 'Events',
          key: 'id'
        }
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
    await queryInterface.dropTable('Transactions');
  }
};