'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // melakukan enkripsi
    static #encrypt = password => bcrypt.hashSync(password, 10)

    // memproses registrasi
    static register = (id, { fullName, email, username, password, birthDate, gender, domicile, profession }, roleID) => {
      const encryptedPassword = this.#encrypt(password)
      return this.create({
        id,
        roleID,
        fullName,
        email,
        username,
        password: encryptedPassword,
        birthDate,
        gender,
        domicile,
        profession
      })
    }

    // mengecek kecocokan antara password yang sebenarnya dengan yang dienkripsi
    checkPassword = password => bcrypt.compareSync(password, this.password)

    // proses autentikasi user
    static authenticate = async ({ username, password }) => {
      try {
        const user = await this.findOne({
          where: { username }
        })
        const isPasswordValid = user.checkPassword(password)

        if (!isPasswordValid) return Promise.reject('Wrong password')
        return Promise.resolve(user)
      } 
      catch(err) {
        return Promise.reject('User not found!')
      }
    }

    static changePassword = async (user, { oldPassword, newPassword }) => {
      try {
        const isOldPasswordValid = user.checkPassword(oldPassword)
        const encryptedPassword = this.#encrypt(newPassword)

        if (!isOldPasswordValid) return Promise.reject('Old password is not valid')
        return this.update({
          password: encryptedPassword
        }, {
          where: {
            id: user.id
          }
        })
      } catch(err) {
        return Promise.reject('Error system')
      }
    }

    static updateProfile = (id, { fullName, email, username, birthDate, gender, domicile, profession }) => {
      return this.update({
        fullName,
        email,
        username,
        birthDate,
        gender,
        domicile,
        profession
      }, {
        where: {
          id
        }
      })
    }

    static updateProfilePicture = (id, filename) => {
      return this.update({
        profilePicture: filename
      }, {
        where: {
          id
        }
      })
    }
  };

  Users.init({
    roleID: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    birthDate: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    domicile: DataTypes.STRING,
    profession: DataTypes.STRING,
    profilePicture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};