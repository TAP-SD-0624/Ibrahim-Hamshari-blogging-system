import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import userDTO from "../DTO/userDTO";
import bcrypt from 'bcrypt'
import { HttpError } from "../utils/HttpError";
import { JWTPayload } from "../config/auth";
import jwt from 'jsonwebtoken'

export async function createUser(req: Request, res: Response, next: NextFunction) {

  const username: string = req.body.username
  const password: string = req.body.password
  const nickname: string = req.body.nickname
  try {
    await User.create({ username, password, nickname });
    res.status(201).json({ status: "success" });
  } catch (err) {
    throw err;
  }


}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  const username: string = req.body.username;
  const password: string = req.body.password;

  try {
    const user: userDTO = (await User.findOne({
      where: { username }
    })) as userDTO
    if (!user) {
      throw new HttpError(400, "Username is Wrong!")
    }
    const isEqual = await bcrypt.compare(password, user.password!);
    if (!isEqual) {
      throw new HttpError(400, "Password is Wrong!")
    }
    const payload: JWTPayload = {
      id:user.id!,
      nickname: user.nickname!
    }
    const SECRET: string | undefined = process.env.SECRET;
    if (!SECRET) {
      throw new Error("SECRET IS NOT SET ")
    }
    const token: string = jwt.sign(payload, SECRET, { expiresIn: "30m" });
    res.status(200).json({
      status: "success", data: {
        token
      }
    })
  } catch (err: any) {
    throw err
  }
}
export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    // this is not best practice you should never return all of the users.
    const users: Array<userDTO> = (await User.findAll({
      attributes: ["id", "nickname", "username", "password"]
    })) as Array<userDTO>
    res.status(200).json({ status: "success", data: users });
  }
  catch (err) {
    throw err;
  }

}
export async function getUserDetails(req: Request, res: Response, next: NextFunction) {
  const id = req.params.userId;
  const user:userDTO = req.user as userDTO;
  const userId = user.id;
  if(id != userId){
    throw new HttpError(403,"FORBIDDEN");
  }
  try {
    const user: userDTO = (await User.findByPk(id, {
      attributes: ["id", "nickname", "username", "password"]
    })) as userDTO;

    res.status(200).json({ status: "success", data: user });
  }
  catch (err) {
    throw err;
  }
}
export async function updateUser(req: Request, res: Response, next: NextFunction) {
  const id = req.params.userId;
  const user:userDTO = req.user as userDTO;
  const userId = user.id;
  if(id != userId){
    throw new HttpError(403,"FORBIDDEN");
  }
  const { nickname, username, password } = req.body;
  let obj: userDTO = { nickname, username, password };
  obj = Object.fromEntries(Object.entries(obj).filter(([key, val]) => val));

  try {
    const data = await User.update({ nickname, username, password }, {
      where: { id }
    });
    res.status(200).json({ status: "success" });
  }
  catch (err) {
    throw err;
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const id = req.params.userId;
  const user:userDTO = req.user as userDTO;
  const userId = user.id;
  if(id != userId){
    throw new HttpError(403,"FORBIDDEN");
  }
  try {
    await User.destroy({
      where: { id }
    });
    res.status(200).json({ status: "success" });
  }
  catch (err) {
    throw err;
  }
}