import { body } from "express-validator";
import validateInfo from "./validate";

export const createCommentValidator = [
  body("body", "A valid comment body between 2 to 150 characters must be provided").notEmpty().isLength({ max: 150, min: 2 }),

  validateInfo
]