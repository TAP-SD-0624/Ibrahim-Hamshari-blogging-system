import sequelize from "../config/config";
import Sequelize from 'sequelize';
import Category from "./Category";


const Post = sequelize.define("Post", {
  title: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  }
})

Post.belongsToMany(Category, {
  through: "PostCategory"
});
Category.belongsToMany(Post, {
  through: "PostCategory"
});

export default Post;