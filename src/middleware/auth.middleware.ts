import { NextFunction } from "express";
import ApiError from "../exception/api-errors";
import { IUser } from "../interfaces";
import tokenService from "../services/token-service";

export default function (req: any, res: any, next: NextFunction) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return next(ApiError.UnauthorizedError());

    const accessToken = authorization.split(" ")[1];
    if (!accessToken) return next(ApiError.UnauthorizedError());

    const userData: IUser | null =
      tokenService.validateAccessToken(accessToken);

    if (!userData) return next(ApiError.UnauthorizedError());

    req.user = userData;

    next();
  } catch (e) {
    next(ApiError.UnauthorizedError());
  }
}
