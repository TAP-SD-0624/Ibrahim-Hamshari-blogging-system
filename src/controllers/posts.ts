import { NextFunction, Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User";
import Comment from "../models/Comment";
import Category from "../models/Category";
import postDTO from "../DTO/postDTO";
import userDTO from "../DTO/userDTO";
import { HttpError } from "../utils/HttpError";

export async function createPost(req: Request, res: Response, next: NextFunction) {
  const user = req.user as userDTO;
  const userId = user.id;
  const { title, body } = req.body;
  try {
    const post = await Post.create({ title, body, userId });
    res.status(201).json({ status: "success", data: post.dataValues.id })
  }
  catch (err) {
    throw err;
  }
}

export async function getAllPosts(req: Request, res: Response, next: NextFunction) {

  try {
    // this is not best practice you should never return all of the users.
    const posts = (await Post.findAll({
      attributes: ["id", "title", "body"],
      include: [
        {
          attributes: ["nickname"],
          model: User
        }, {
          attributes: ["body"],
          model: Comment

        }, {
          attributes: ["name"],
          model: Category,
          through:{
            attributes:[]
          }
        }
      ]
    }))
    res.status(200).json({ status: "success", data: posts });
  }
  catch (err) {
    throw err;
  }

}
export async function getPostDetails(req: Request, res: Response, next: NextFunction) {
  const user = req.user as userDTO;
  const userId = user.id;

  const id = req.params.postId;
  try {
    const post: postDTO = (await Post.findOne({
      attributes: ["id", "title", "body"],
      where: { id, userId },
      include: [
        {
          attributes: ["nickname"],
          model: User
        }, {
          attributes: ["body"],
          model: Comment

        }, {
          attributes: ["name"],
          model: Category,
          through: {
            attributes: []
          }
        }
      ]
    })) as postDTO
    if (!post) {
      throw new HttpError(404, "No Such Resource!")
    }
    res.status(200).json({ status: "success", data: post });

  }
  catch (err) {
    throw err;
  }
}
export async function updatePost(req: Request, res: Response, next: NextFunction) {
  const user = req.user as userDTO;
  const userId = user.id;

  const id = req.params.postId;
  const { title, body } = req.body;
  let obj: postDTO = { title, body };
  obj = Object.fromEntries(Object.entries(obj).filter(([key, val]) => val));
  try {
    const post: postDTO = (await Post.update(obj, {
      where: { id, userId }
    })) as postDTO
    if (!post) {
      throw new HttpError(404, "No Such Resource!")

    }
    res.status(200).json({ status: "success" });
  }
  catch (err) {
    throw err;
  }
}

export async function deletePost(req: Request, res: Response, next: NextFunction) {
  const user = req.user as userDTO;
  const userId = user.id;

  const id = req.params.postId;
  try {
    const post = await Post.destroy({ where: { id, userId } });
    if (!post) {
      throw new HttpError(404, "No Such Resource!")

    }
    res.status(200).json({ status: "success" });
  }
  catch (err) {
    throw err;
  }
}




