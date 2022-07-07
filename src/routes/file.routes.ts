import { Router } from "express";
import fileController from "../controllers/file-controller";
import authMiddleware from "../middleware/auth.middleware";
import fileMiddleware from "../middleware/file.middleware";

const router: Router = Router();

router.post(
  "/upload",
  fileMiddleware.single("file"),
  fileController.upload.bind(fileController)
);

router.get("/delete/:file", authMiddleware, fileController.delete);

export default router;
