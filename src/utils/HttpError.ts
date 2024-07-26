import { ErrorCodes } from "./ErrorCodes";

export class HttpError extends Error {
  private _statusCode: ErrorCodes;
  constructor(code: ErrorCodes, message: any, stack?: string) {
    super(message);
    Object.setPrototypeOf(this, HttpError.prototype);
    this._statusCode = code;
    this.name = "HttpError";
    if (stack) {
      this.stack = stack;
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
  get statusCode(): ErrorCodes {
    return this._statusCode;
  }
}