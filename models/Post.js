const {
  Model,
  DataTypes
} = require("sequelize");
const sequelize = require("../config/connection");

// this is our Post Model
class Post extends Model {}

Post.init({
  id: {
    type: DataTypes.INTEFER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1]
    }
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1]
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "user",
      key: "id"
    }
  }
}, {
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: "post"
})

module.exports = Post;
