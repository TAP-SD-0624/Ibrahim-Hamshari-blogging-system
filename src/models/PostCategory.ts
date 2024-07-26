import sequelize from "../config/config";


const PostCategory = sequelize.define("postcategory", {}, {
  freezeTableName: true
})


export default PostCategory;
