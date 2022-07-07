import { Comment } from "../database/Comment";
import ApiError from "../exception/api-errors";
import itemService from "./item-service";
import userService from "./user-service";

class CommentService {
  async create(UserId: number, ItemId: number, text: string) {
    if (
      (await userService.checkUser(UserId)) &&
      (await itemService.check(ItemId))
    )
      return await Comment.create({ UserId, ItemId, text });
    throw ApiError.UnauthorizedError();
  }
}

export default new CommentService();
