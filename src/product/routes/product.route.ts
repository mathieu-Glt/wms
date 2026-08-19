import { Router } from "express";
import { ProductController } from "../controller/product.controller";
import { authMiddleware, requireRole } from "../../middleware/auth.middleware";

const router = Router();
const productController = new ProductController();

router.get("/", (req, res) => productController.find(req, res));
router.post("/", authMiddleware, requireRole("ADMIN", "MANAGER"), (req, res) =>
  productController.create(req, res),
);

router.put(
  "/:id",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => productController.update(req, res),
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => productController.delete(req, res),
);

router.get("/:id", (req, res) => productController.findById(req, res));

export default router;
