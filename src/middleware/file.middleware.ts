import path from "path";
import multer from "multer";
import randomstring from "randomstring";

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    try {
      console.log(2);
      cb(null, path.join(path.dirname(__dirname), "..", `/static/images/`));
    } catch (error) {
      console.log(error);
    }
  },
  filename: async (req: any, file: any, cb: any) => {
    try {
      cb(
        null,
        randomstring.generate() +
          "_" +
          Date.now() +
          path.extname(file.originalname)
      );
    } catch (error) {
      console.log(error);
    }
  },
});

export default multer({
  storage: storage,
});
