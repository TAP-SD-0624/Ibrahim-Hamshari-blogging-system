import { NextFunction, Request, Response } from "express";
import Comment from "../models/Comment";
import CommentDTO from "../DTO/commentDTO";
import User from "../models/User";
import { HttpError } from "../utils/HttpError";
import userDTO from "../DTO/userDTO";

export async function createComment(req: Request, res: Response, next: NextFunction) {
  const user: userDTO = req.user as userDTO;
  const userId = user.id;

  const postId = req.params.postId;
  const { body } = req.body;

  try {
    const comment = await Comment.create({ body, postId, userId })
    if (!comment) {
      throw new HttpError(404, "No Such Resource!");
    }
    res.status(200).json({ status: "success" });
  }
  catch (err) {
    throw err;
  }
}
export async function getAllComments(req: Request, res: Response, next: NextFunction) {

  const postId = req.params.postId;
  try {
    const comments: Array<CommentDTO> = (await Comment.findAll({
      attributes: ["body"],
      include: [
        {
          attributes: ["nickname"],
          model: User
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

