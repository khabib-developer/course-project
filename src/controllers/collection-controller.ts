import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Tag } from "../database/Tag";
import ApiError from "../exception/api-errors";
import collectionService from "../services/collection-service";
import commentService from "../services/comment-service";
import itemService from "../services/item-service";
import likeService from "../services/like-service";
import tagService from "../services/tag-service";
class CollectionController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      this.validation(req, next);
      res.json(
        await collectionService.create(req.body, req.body.additionalFields)
      );
    } catch (error) {
      next(error);
    }
  }

  async getBigCollections(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await collectionService.getBigCollections());
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await collectionService.update(req.body));
    } catch (error) {
      next(error);
    }
  }
  async delete(req: any, res: Response, next: NextFunction) {
    try {
      res.json(await collectionService.delete(req.params.id));
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await collectionService.getById(req.body.id));
    } catch (error) {
      next(error);
    }
  }

  async getLastItems(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await itemService.getlastItems(req.body));
    } catch (error) {
      next(error);
    }
  }

  async validation(req: Request, next: NextFunction) {
    if (!validationResult(req).isEmpty()) {
      next(ApiError.BadRequest("Incorrect details"));
    }
  }

  async search(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await collectionService.search(req.query.q?.toString() || ""));
    } catch (error) {
      next(error);
    }
  }

  async createItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { tags } = req.body;
      const existTags = await tagService.getByTag(tags);
      const newTags = tags.filter(
        (tag: string) => !existTags.find((t: Tag) => t.name === tag)
      );

      res.json(
        await itemService.create(req.body, newTags, existTags, req.body.theme)
      );
    } catch (error) {
      next(error);
    }
  }

  async updateItem(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await itemService.update(req.body));
    } catch (error) {
      next(error);
    }
  }

  async destroyItem(req: any, res: Response, next: NextFunction) {
    try {
      res.json(await itemService.delete(req.params.id));
    } catch (error) {
      next(error);
    }
  }

  async like(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await likeService.clickAction(req.body.UserId, req.body.ItemId));
    } catch (error) {
      next(error);
    }
  }

  async comment(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(
        await commentService.create(
          req.body.UserId,
          req.body.ItemId,
          req.body.text
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getAllTags(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await tagService.getAllTags());
    } catch (error) {
      next(error);
    }
  }

  async getComments(req: any, res: Response, next: NextFunction) {
    try {
      res.json(await commentService.get(req.params.ItemId));
    } catch (error) {
      next(error);
    }
  }
}

export default new CollectionController();
