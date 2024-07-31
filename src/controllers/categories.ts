import { NextFunction, Request, Response } from "express";
import Category from "../models/Category";
import PostCategory from "../models/PostCategory";
import CategoryDTO from "../DTO/categoryDTO";
import Post from "../models/Post";
import userDTO from "../DTO/userDTO";
import { HttpError } from "../utils/HttpError";

export async function createCategory(req: Request, res: Response, next: NextFunction) {
  const user: userDTO = req.user as userDTO;
  const userId = user.id;

  const postId = req.params.postId;
  const { categoryId } = req.body;
  try {
    const post = await Post.findOne({ where: { userId, id:postId } });
    if (!post) {
      throw new HttpError(404, "No Such Resource!");
    }
    await PostCategory.create({ postId, categoryId });
    res.status(201).json({ status: "success" });
  }
  catch (err) {
    throw err;
  }
}

export async function getAllPostCategories(req: Request, res: Response, next: NextFunction) {
  const user: userDTO = req.user as userDTO;
  const userId = user.id;

  const postId = req.params.postId;
  try {
    const postCategories = await Post.findOne(
      {
        attributes: [],
        where: { id: postId, userId },
        include: {
          attributes: ["name"],
          model: Category,
          through: {
            attributes: []
          }
        }
      })
    const data: Array<CategoryDTO> = postCategories?.dataValues.categories;
    res.status(200).json({ status: "success", data })
  }
  catch (err) {
    throw err;
  }
}

export async function createNewCategory(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    res.status(201).json({ status: "success", data: category.dataValues.id })
  }
  catch (err) {
    throw err;
  }
}

export async function getAllCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const data: Array<CategoryDTO> = (await Category.findAll({
      attributes: ["id", "name"]
    })) as Array<CategoryDTO>;
    res.status(200).json({ status: "success", data });
  }
  catch (err) {
    throw err;
  }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  const id = req.params.categoryId;
  try {
    await Category.destroy({
      where: { id }
    })
    res.status(200).json({ status: "success" });
  } catch (err) {
    throw err;
  }
}