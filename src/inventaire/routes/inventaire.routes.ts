import { Router } from "express";
import { InventaireController } from "../controller/inventaire.controller";
import { authMiddleware, requireRole } from "../../middleware/auth.middleware";

const router = Router();
const inventaireController = new InventaireController();

router.get("/", authMiddleware, (req, res) =>
  inventaireController.find(req, res),
);
router.get("/:id", authMiddleware, (req, res) =>
  inventaireController.findById(req, res),
);

router.post(
  "/",
  authMiddleware,
  requireRole("ADMIN", "MANAGER", "OPERATOR"),
  (req, res) => inventaireController.create(req, res),
);

router.patch(
  "/:id/validate",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => inventaireController.validate(req, res),
);

export default router;
