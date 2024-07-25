import sequelize from "../config/config";
import Sequelize from "sequelize";

const Comment = sequelize.define("Comment",{
  body:{
    type:Sequelize.DataTypes.STRING,
    allowNull:false
  }
})


export default Comment;