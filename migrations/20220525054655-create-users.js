'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.CHAR(8)
      },
      roleID: {
        allowNull: false,
        type: Sequelize.INTEGER(2),
        references: {
          model: 'Roles',
          key: 'id'
        }
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(20),
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.DATEONLY
      },
      gender: {
        type: Sequelize.STRING(10)
      },
      domicile: {
        type: Sequelize.STRING(50)
      },
      profession: {
        type: Sequelize.STRING(20)
      },
      profilePicture: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};