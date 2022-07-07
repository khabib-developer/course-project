import { NextFunction, Request, Response } from "express";
import ApiError from "../exception/api-errors";

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "Something went wrong" });
}
