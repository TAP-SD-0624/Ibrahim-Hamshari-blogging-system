import { NextFunction, Request, Response } from "express";
import { Result, validationResult } from "express-validator";
import { HttpError } from "../utils/HttpError";
import { tryCatch } from "../middlewares/tryCatch";
import { ErrorCodes } from "../utils/ErrorCodes";

function validate(req: Request, res: Response, next: NextFunction) {
  const result: Result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array();
    throw new HttpError(ErrorCodes.BADREQUEST,JSON.stringify(errors));
  }
  next();

}

const validateInfo= tryCatch(validate);

export default validateInfo;