import { Router } from "express";
import { check } from "express-validator";
import userController from "../controllers/user-controller";
import authMiddleware from "../middleware/auth.middleware";
import adminMiddleware from "../middleware/admin.middleware";

const router: Router = Router();

router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("name", "Incorrect name").isString(),
    check("password", "Incorrect password").isString(),
  ],
  userController.register.bind(userController)
);

router.post(
  "/login",
  [
    check("email", "Incorrect username").isEmail().isString(),
    check("password", "Incorrect password").isString(),
  ],
  userController.login.bind(userController)
);

router.post(
  "/update",
  authMiddleware,
  userController.update.bind(userController)
);

router.post(
  "/updateUsers",
  authMiddleware,
  adminMiddleware,
  userController.updateUsers.bind(userController)
);

router.get("/check", authMiddleware, userController.check.bind(userController));

router.get("/refresh", userController.refresh.bind(userController));

router.get("/logout", userController.logout.bind(userController));

router.get(
  "/getAll",
  authMiddleware,
  adminMiddleware,
  userController.getAll.bind(userController)
);

router.post(
  "/bulkDelete",
  authMiddleware,
  adminMiddleware,
  userController.bulkDelete.bind(userController)
);

export default router;
