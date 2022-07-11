import { User } from "../database/User";
import ApiError from "../exception/api-errors";
import { IUser } from "../interfaces";
import * as bcrypt from "bcryptjs";
import tokenService from "./token-service";
import { UserDto } from "../dto";
import { Collection } from "../database/Collection";
import { Like } from "../database/Like";
import { Item } from "../database/Item";
import fileService from "./file-service";

class UserService {
  async registration(body: IUser) {
    const candidate = await User.findOne({ where: { email: body.email } });
    if (candidate) {
      throw ApiError.BadRequest("User with this email already exist");
    }
    return await User.create({
      ...body,
      password: await bcrypt.hash(body.password!, 12),
    });
  }

  async login({ email, password }: IUser) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw ApiError.BadRequest("User is not found");
    const isMatch = await bcrypt.compare(password!, user.password);
    if (!isMatch) throw ApiError.BadRequest("Invalid password");
    return await this.checkUser(user.id);
  }

  async update(body: User) {
    await User.update({ ...body }, { returning: true, where: { id: body.id } });
    return await this.checkUser(body.id);
  }

  async deleteUsers(id: number[]) {
    const users: any = await User.findAll({ where: { id: id } });
    users.forEach((user: any) => {
      user?.destroy();
    });
    return id;
  }

  async updateUsers(id: number[], body: any) {
    return await User.update(body, { where: { id: id } });
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw ApiError.UnauthorizedError();
    const userData = tokenService.validateRefreshToken(refreshToken);
    if (!userData || !(await tokenService.findToken(refreshToken)))
      throw ApiError.UnauthorizedError();
    return this.checkUser(userData.id!);
  }

  async checkUser(id: number) {
    const user = await User.findOne({
      where: { id },
      include: [Collection, Like],
    });
    if (user) {
      if (user.blocked) throw ApiError.Blocked();
      return user;
    }
    throw ApiError.UnauthorizedError();
  }

  async bulkDelete(ids: number[]) {
    const users = await User.findAll({
      where: { id: ids },
      include: [{ model: Collection, include: [Item] }],
    });

    users.forEach(async (user) => {
      console.log(user);
      user.Collections.forEach((collection) => {
        collection.image && fileService.delete(collection.image);
        (collection.Items as Item[]).forEach((item) =>
          fileService.delete(item.image)
        );
      });

      await user.destroy();
    });

    return ids;
  }

  async getUsers() {
    return await User.findAll();
  }
}

export default new UserService();
