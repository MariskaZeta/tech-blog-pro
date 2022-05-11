const {
  Model,
  DataTypes
} = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require('bcrypt');

// this is our User Model
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// table column definitions and configurations
User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4]
    }
  }
}, {
  hooks: {
    // set up beforeCreate lifecycle "hook" functionality
    async beforeCreate(newUserData) {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
      return newUserData;
    },

    async beforeUpdate(updatedUserData) {
      updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
      return updatedUserData;
    }
  },
  // passing in the imported sequelize connection
  sequelize,
  // don't automatically create createdAt/updatedAt timestamp fields
  timestamps: false,
  // don't pluralize name of database table
  freezeTableName: true,
  // use underscores instead of camel-casing
  underscored: true,
  // make it so out model name stays lowercase in the database
  modelName: "user"
});

module.exports = User;
