import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
dotenv.config();

import path from 'path';

import sequelize from './config/config';
import { logger } from './utils/loggers';

sequelize.authenticate().then(() => {
  logger.info({message:"Successfully Authenticated", timeStamp:new Date().toString()});
}).catch((err: Error) => {
  logger.error(err.message);
})

import "./models/User"
import "./models/Post"
import "./models/Comment"
import "./models/Category"
import userRouter from './routes/users';
import postRouter from './routes/posts';
sequelize.sync({alter:true})

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use("/user",userRouter)
app.use("/post",postRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

  res.status(500).json({ error: err.message });

})

export default app;