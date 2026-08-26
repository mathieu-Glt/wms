import { Router } from "express";
import { SupplierController } from "../controller/supplier.controller";
import { authMiddleware, requireRole } from "../../middleware/auth.middleware";

const router = Router();
const supplierController = new SupplierController();

router.get("/", authMiddleware, (req, res) =>
  supplierController.find(req, res),
);
router.get("/:id", authMiddleware, (req, res) =>
  supplierController.findById(req, res),
);

router.post("/", authMiddleware, requireRole("ADMIN", "MANAGER"), (req, res) =>
  supplierController.create(req, res),
);

router.put(
  "/:id",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => supplierController.update(req, res),
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => supplierController.delete(req, res),
);

export default router;
