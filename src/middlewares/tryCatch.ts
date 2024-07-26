import { Request, Response, NextFunction } from "express"
import { ErrorCodes } from "../utils/ErrorCodes";
import { logger } from "../utils/loggers";
import { getStackDetails } from "../utils/getStackDetails";
import { HttpError } from "../utils/HttpError";
export const tryCatch = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next);
  }
  catch (err: any) {
    const statusCode = err.statusCode ? err.statusCode : ErrorCodes.INTERNALERROR;
    logger.error({ statusCode, message: JSON.stringify(err.message), stack: getStackDetails(err.stack) })
    next(new HttpError(statusCode, err.message, err.stack));

  }
} 