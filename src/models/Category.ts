import sequelize from "../config/config";
import Sequelize from "sequelize";

const Category = sequelize.define("category",{
  name:{
    type:Sequelize.DataTypes.STRING,
    allowNull:false,
    unique:true
  }
})

export default Category;
