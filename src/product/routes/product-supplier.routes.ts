import { Router } from "express";
import { ProductSupplierController } from "../controller/product-supplier.controller";
import { authMiddleware, requireRole } from "../../middleware/auth.middleware";

const router = Router();
const productSupplierController = new ProductSupplierController();

router.get("/products/:productId/suppliers", authMiddleware, (req, res) =>
  productSupplierController.findSuppliersByProduct(req, res),
);
router.get("/suppliers/:supplierId/products", authMiddleware, (req, res) =>
  productSupplierController.findProductsBySupplier(req, res),
);

router.post(
  "/product-suppliers",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => productSupplierController.link(req, res),
);

router.delete(
  "/product-suppliers/:productId/:supplierId",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => productSupplierController.unlink(req, res),
);

export default router;
