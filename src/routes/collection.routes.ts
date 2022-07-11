import { Router } from "express";
import { check } from "express-validator";
import collectionController from "../controllers/collection-controller";
import authMiddleware from "../middleware/auth.middleware";

const router: Router = Router();

router.post(
  "/create",
  [
    check("name", "Incorrect name").isString(),
    check("description", "Incorrect name").isString(),
    check("theme", "Incorrect password").isString(),
  ],
  authMiddleware,
  collectionController.create.bind(collectionController)
);

router.post("/update", collectionController.update.bind(collectionController));

router.get(
  "/delete/:id",
  collectionController.delete.bind(collectionController)
);

router.post(
  "/getById",
  collectionController.getById.bind(collectionController)
);

router.get(
  "/getBigCollections",
  collectionController.getBigCollections.bind(collectionController)
);

router.post(
  "/createItem",
  authMiddleware,
  collectionController.createItem.bind(collectionController)
);

router.post(
  "/updateItem",
  authMiddleware,
  collectionController.updateItem.bind(collectionController)
);

router.get(
  "/deleteItem/:id",
  authMiddleware,
  collectionController.destroyItem.bind(collectionController)
);

router.post(
  "/getLastItems",
  collectionController.getLastItems.bind(collectionController)
);

router.get(
  "/getAllTags",
  collectionController.getAllTags.bind(collectionController)
);

router.get("/search", collectionController.search.bind(collectionController));

router.get(
  "/getComments/:ItemId",
  collectionController.getComments.bind(collectionController)
);

router.post(
  "/like",
  authMiddleware,
  collectionController.like.bind(collectionController)
);

router.post(
  "/comment",
  authMiddleware,
  collectionController.comment.bind(collectionController)
);

export default router;
