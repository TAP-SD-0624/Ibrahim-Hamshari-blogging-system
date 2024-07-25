import { Request, Response, NextFunction } from "express"
import { HttpError } from "../utils/httpError";
import { ErrorCodes } from "../utils/ErrorCodes";
import { logger } from "../utils/loggers";
import { getStackDetails } from "../utils/getStackDetails";
export const tryCatch = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next);
  }
  catch (err: any) {
    const statusCode = err.statusCode ? err.statusCode : ErrorCodes.INTERNALERROR;
    logger.error({ statusCode, ...getStackDetails(err.stack) })
    throw new HttpError(statusCode, err.message, err.stack)
  }
}