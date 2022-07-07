import { Tag } from "../database/Tag";
import ApiError from "../exception/api-errors";

class TagService {
  async create(tag: { [k: string]: string }) {
    return await Tag.create({ ...tag });
  }

  async getByTag(tags: string[]) {
    return await Tag.findAll({ where: { name: tags } });
  }

  async getByTheme(theme: string) {
    return await Tag.findAll({ where: { theme } });
  }

  async getAllTags() {
    return await Tag.findAll();
  }
}

export default new TagService();
