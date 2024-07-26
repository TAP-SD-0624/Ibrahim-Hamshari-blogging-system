import sequelize from "../config/config";
import Sequelize from 'sequelize';
import Category from "./Category";
import Comment from "./Comment";
import PostCategory from "./PostCategory";


const Post = sequelize.define("post", {
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
  through: PostCategory
});
Category.belongsToMany(Post, {
  through: PostCategory
});

Post.hasMany(Comment);
Comment.belongsTo(Post);
export default Post;