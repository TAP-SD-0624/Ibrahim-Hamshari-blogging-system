import { NextFunction, Request, Response } from "express";
import Comment from "../models/Comment";
import CommentDTO from "../DTO/commentDTO";
import User from "../models/User";

export async function createComment(req: Request, res: Response, next: NextFunction) {
  const postId = req.params.postId;
  const { body,userId } = req.body;

  try {
    await Comment.create({ body, postId,userId })
    res.status(200).json({ status: "success" });
  }
  catch (err) {
    throw err;
  }
}
export async function getAllComments(req: Request, res: Response, next: NextFunction) {
  const postId = req.params.postId;
  try {
    const comments:Array<CommentDTO> = (await Comment.findAll({
      attributes:["body"],
      include:[
        {
          attributes:["nickname"],
          model:User
        }
      ],
      where: { postId }
    })) as Array<CommentDTO>
    res.status(200).json({ status: "success", data: comments });
  }
  catch (err) {
    throw err;
  }
}

