import { body } from "express-validator";
import validateInfo from "./validate";


export const createPostValidator = [
  body("title", "A non empty valid title between 3 to 20 characters must be provided").notEmpty().isLength({ max: 20, min: 3 }).isString(),
  body("body", "A non empty valid body between 2 to 1000 characters must be provided").notEmpty().isLength({ max: 1000, min: 2 }).isString(),
  body("userId", "A non empty valid userId must be provided").notEmpty().isLength({ max: 20 }).isInt().toInt(),
  validateInfo
]



export const updatePostValidator = [
  body("title", "A valid title between 3 to 20 characters must be provided").optional().isLength({ max: 20, min: 3 }).isString(),
  body("body", "A valid body between 2 to 1000 characters must be provided").optional().isLength({ max: 1000, min: 2 }).isString(),

  validateInfo
]

