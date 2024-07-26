import express, { Express, Request, Response, NextFunction, Router } from 'express';
import dotenv from 'dotenv'
dotenv.config();

import path from 'path';

import sequelize from './config/config';
import { logger } from './utils/loggers';

sequelize.authenticate().then(() => {
  logger.info({ message: "Successfully Authenticated", timeStamp: new Date().toString() });
}).catch((err: Error) => {
  logger.error(err.message);
})

import "./models/User"
import "./models/Post"
import "./models/Comment"
import "./models/Category"
import "./models/PostCategory"
import userRouter from './routes/users';
import postRouter from './routes/posts';
import categoryRouter from './routes/categories';
import { HttpError } from './utils/HttpError';
import isJSONParsable from './utils/isJSONParsable';
sequelize.sync()


const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use("/api/user", userRouter)
app.use("/api/post", postRouter)
app.use("/api/category", categoryRouter)

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode).json({ error:isJSONParsable(err.message)? JSON.parse(err.message):err.message });

})

export default app;