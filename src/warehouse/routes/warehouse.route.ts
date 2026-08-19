import { Router } from "express";
import { WarehouseController } from "../controller/warehouse.controller";
import { authMiddleware, requireRole } from "../../middleware/auth.middleware";

const router = Router();
const warehouseController = new WarehouseController();

router.get("/", (req, res) => warehouseController.find(req, res));
router.post("/", authMiddleware, requireRole("ADMIN", "MANAGER"), (req, res) =>
  warehouseController.create(req, res),
);
router.put(
  "/:id",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => warehouseController.update(req, res),
);
router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => warehouseController.delete(req, res),
);

router.get("/:id", (req, res) => warehouseController.findById(req, res));

export default router;
