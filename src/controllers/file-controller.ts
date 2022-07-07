import { NextFunction, Request, Response } from "express";
import ApiError from "../exception/api-errors";
import fileService from "../services/file-service";

class FileController {
  async upload(req: any, res: Response, next: NextFunction) {
    try {
      if (req.file) {
        return res.json({
          image: req.file.filename,
        });
      }
      throw ApiError.BadRequest("Something went wrong");
    } catch (error) {
      next(error);
    }
  }

  async delete(req: any, res: Response, next: NextFunction) {
    try {
      await fileService.delete(req.params.file);
      res.json({ file: req.params.file });
    } catch (error) {
      next(error);
    }
  }
}

export default new FileController();
