import sequelize from "../config/config";
import Sequelize from "sequelize";
import Post from "./Post";
import Comment from "./Comment";


const User = sequelize.define("user", {
  nickname: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique:true
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