import { body } from "express-validator";
import validateInfo from "./validate";


export const createUserValidator = [
  body("nickname", "A non empty valid nickname between 3 to 20 characters must be provided").notEmpty().isLength({ max: 20, min: 3 }).isString(),
  body("username", "A non empty valid username between 4 to 16 characters must be provided").notEmpty().isLength({ max: 16, min: 4 }).isString(),
  body("password", "A non empty valid password between 8 to 20 characters must be provided").notEmpty().isLength({ max: 20, min: 8 }).isString(),
  validateInfo
]


export const updateUserValidator = [
  body("nickname", "A valid nickname between 3 to 20 characters must be provided").optional().isLength({ max: 20, min: 3 }).isString(),
  body("username", "A valid username between 4 to 16 characters must be provided").optional().isLength({ max: 16, min: 4 }).isString(),
  body("password", "A valid password between 8 to 20 characters must be provided").optional().isLength({ max: 20, min: 8 }).isString(),
  validateInfo
]


