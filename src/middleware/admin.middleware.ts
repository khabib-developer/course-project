import { NextFunction } from "express";
import ApiError from "../exception/api-errors";

export default function (req: any, res: any, next: NextFunction) {
  try {
    if (!req.user.admin) {
      throw ApiError.UnauthorizedError();
    }
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}
