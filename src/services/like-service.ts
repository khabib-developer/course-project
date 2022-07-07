import { Like } from "../database/Like";
import ApiError from "../exception/api-errors";
import itemService from "./item-service";
import userService from "./user-service";

class LikeService {
  async create(UserId: number, ItemId: number) {
    if (
      (await userService.checkUser(UserId)) &&
      (await itemService.check(ItemId))
    ) {
      return await Like.create({ UserId, ItemId });
    }
    throw ApiError.UnauthorizedError();
  }

  async clickAction(UserId: number, ItemId: number) {
    const like = await Like.findOne({ where: { UserId, ItemId } });
    console.log(like);
    return like
      ? await this.delete(UserId, ItemId)
      : this.create(UserId, ItemId);
  }

  async delete(UserId: number, ItemId: number) {
    const like = await Like.findOne({ where: { UserId, ItemId } });
    await like?.destroy();
    return like;
  }
}

export default new LikeService();
