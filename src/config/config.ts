import { Sequelize } from "sequelize";

const dbUsername = process.env.DBUSERNAME;
const dbPassword = process.env.DBPASSWORD;

if (!dbUsername || !dbPassword) {
  throw new Error('Database username and/or password not set in environment variables');
}

 const sequelize = new Sequelize('Blog', dbUsername, dbPassword, {
  host: 'localhost',
  dialect: 'mysql',
  logging:false
});


export default sequelize;