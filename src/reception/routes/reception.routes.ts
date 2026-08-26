import { Router } from "express";
import { ReceptionController } from "../controller/reception.controller";
import { authMiddleware, requireRole } from "../../middleware/auth.middleware";

const router = Router();
const receptionController = new ReceptionController();

router.get("/", authMiddleware, (req, res) =>
  receptionController.find(req, res),
);
router.get("/:id", authMiddleware, (req, res) =>
  receptionController.findById(req, res),
);

router.post(
  "/",
  authMiddleware,
  requireRole("ADMIN", "MANAGER", "OPERATOR"),
  (req, res) => receptionController.create(req, res),
);

router.patch(
  "/:id/validate",
  authMiddleware,
  requireRole("ADMIN", "MANAGER", "OPERATOR"),
  (req, res) => receptionController.validate(req, res),
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => receptionController.delete(req, res),
);

export default router;
