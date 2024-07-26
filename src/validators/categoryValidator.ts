import { body } from "express-validator";
import validateInfo from "./validate";

export const createCategoryValidator = [
  body("categoryId", "A valid category ID must be provided").notEmpty().isLength({ max: 20 }).isInt().toInt(),
  validateInfo
]

export const createNewCategoryValidator =[
  body("name","A valid name between 2 to 20 characters must be provided").notEmpty().isLength({max:20,min:2}).isString(),
  validateInfo
]
