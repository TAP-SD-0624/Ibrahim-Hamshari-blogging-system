import sequelize from "../config/config";
import Sequelize from "sequelize";

const Category = sequelize.define("Category",{
  name:{
    type:Sequelize.DataTypes.STRING,
    allowNull:false
  }
})

export default Category;