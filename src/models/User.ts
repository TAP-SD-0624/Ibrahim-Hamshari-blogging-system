import sequelize from "../config/config";
import Sequelize from "sequelize";
import Post from "./Post";
import Comment from "./Comment";
import crypto from 'crypto'


const User = sequelize.define("User", {
  nickname: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  }
})

User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);

export default User;