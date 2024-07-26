import { NextFunction, Request, Response } from "express";
import Category from "../models/Category";
import PostCategory from "../models/PostCategory";
import CategoryDTO from "../DTO/categoryDTO";
import Post from "../models/Post";

export async function createCategory(req: Request, res: Response, next: NextFunction) {
  const postId = req.params.postId;
  const { categoryId } = req.body;
  try {
    await PostCategory.create({ postId, categoryId });
    res.status(201).json({ status: "success" });
  }
  catch (err) {
    throw err;
  }
}

export async function getAllPostCategories(req: Request, res: Response, next: NextFunction) {
  const postId = req.params.postId;
  try {
    const postCategories = await Post.findByPk(postId,
      {
        attributes: [],
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
    res.status(200).json({status:"success"});
  } catch (err) {
    throw err;
  }
}