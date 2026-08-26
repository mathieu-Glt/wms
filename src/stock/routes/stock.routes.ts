import { Router } from "express";
import { StockController } from "../controller/stock.controller";
import { authMiddleware, requireRole } from "../../middleware/auth.middleware";

const router = Router();
const stockController = new StockController();

router.get(
  "/stocks",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => stockController.find(req, res),
);
router.get(
  "/stocks/:id",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => stockController.findById(req, res),
);
router.get(
  "/stocks/product/:productId",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => stockController.findByProductId(req, res),
);
router.get(
  "/stocks/location/:locationId",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => stockController.findByLocationId(req, res),
);

export default router;
