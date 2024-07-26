import { Sequelize } from "sequelize";

const dbUsername = process.env.DBUSERNAME;
const dbPassword = process.env.DBPASSWORD;
const dbName = process.env.DBNAME;
const dbHost = process.env.DBHOST;
const dbPort = process.env.DBPORT;

if (!dbUsername || !dbPassword || !dbName || !dbHost || !dbPort) {
  throw new Error('Database username and/or password not set in environment variables');
}

 const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  port: parseInt(dbPort),
  dialect: 'mysql',
  logging:false
});


export default sequelize;