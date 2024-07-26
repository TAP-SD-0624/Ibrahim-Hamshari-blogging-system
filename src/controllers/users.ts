import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import userDTO from "../DTO/userDTO";

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { nickname, username, password } = req.body;
    const data = await User.create({ nickname, username, password });
    res.status(201).json({ status: "success",data:data.dataValues.id });
  }
  catch (err) {
    throw err;
  }

}

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    // this is not best practice you should never return all of the users.
    const users: Array<userDTO> = (await User.findAll({
      attributes: ["id","nickname", "username", "password"]
    })) as Array<userDTO>
    res.status(200).json({ status: "success", data: users});
  }
  catch (err) {
    throw err;
  }

}
export async function getUserDetails(req: Request, res: Response, next: NextFunction) {
  const id = req.params.userId;
  try {
    const user: userDTO = (await User.findByPk(id, {
      attributes: ["id","nickname", "username", "password"]
    })) as userDTO;
    
    res.status(200).json({ status: "success", data: user });
  }
  catch (err) {
    throw err;
  }
}
export async function updateUser(req: Request, res: Response, next: NextFunction) {
  const id = req.params.userId;

  const { nickname, username, password } = req.body;
  let obj: userDTO = { nickname, username, password };
  obj = Object.fromEntries(Object.entries(obj).filter(([key, val]) => val));

  try {
    const data = await User.update({ nickname, username, password }, {
      where: { id }
    });
    res.status(200).json({ status: "success"});
  }
  catch (err) {
    throw err;
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const id = req.params.userId;
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