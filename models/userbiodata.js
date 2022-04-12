'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class UserBiodata extends Model {
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
    static register = ({ fullName, gender, email, username, password }, roleID = 2) => {
      const encryptedPassword = this.#encrypt(password)
      return this.create({
        fullName,
        gender,
        email,
        username,
        password: encryptedPassword,
        roleID
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

        if (!user) return Promise.reject('User not found!')
        if (!isPasswordValid) return Promise.reject('Wrong password')
        return Promise.resolve(user)
      } 
      catch(err) {
        return Promise.reject(err)
      }
    }
  
  };

  UserBiodata.init({
    roleID: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserBiodata',
  });
  return UserBiodata;
};