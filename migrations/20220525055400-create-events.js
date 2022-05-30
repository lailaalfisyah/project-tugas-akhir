'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      // tambahin jam mulai dan berakhir
      // tambahin tanggal mulai dan berakhir
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
        type: Sequelize.DATEONLY
      },
      dateEnd: {
        type: Sequelize.DATEONLY
      },
      timeStart: {
        type: Sequelize.TIME
      },
      timeEnd: {
        type: Sequelize.TIME
      },
      price: {
        type: Sequelize.INTEGER
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