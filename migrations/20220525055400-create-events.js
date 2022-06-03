'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      dateStart: {
        type: Sequelize.STRING
      },
      dateEnd: {
        type: Sequelize.STRING
      },
      timeStart: {
        type: Sequelize.STRING
      },
      timeEnd: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      desc: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Events');
  }
};