import fs from "fs";
import path from "path";
import { promisify } from "util";
import ApiError from "../exception/api-errors";

const readFileAsync = promisify(fs.readFile);

class FileService {
  async delete(name: string) {
    try {
      const file =
        path.join(path.dirname(__dirname), "..", `/static/images/`) + name;
      const res = await readFileAsync(file);

      if (res) {
        fs.unlink(file, function (err: any) {
          if (err) {
            console.log(err);
            // throw ApiError.BadRequest(err.message);
          }
          console.log("file deleted successfully");
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new FileService();
