import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { authMiddleware, requireRole } from "../middleware/auth.middleware";

const router = Router();
const userController = new UserController();

router.get("/", authMiddleware, requireRole("ADMIN"), (req, res) =>
  userController.find(req, res),
);

router.get("/:id", authMiddleware, requireRole("ADMIN"), (req, res) =>
  userController.findById(req, res),
);

export default router;
