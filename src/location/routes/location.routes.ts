import { Router } from "express";
import { LocationController } from "../controller/location.controller";
import { authMiddleware, requireRole } from "../../middleware/auth.middleware";

const router = Router();
const locationController = new LocationController();

router.get(
  "/locations",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => locationController.find(req, res),
);
router.get(
  "/locations/:id",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => locationController.findById(req, res),
);

router.post(
  "/locations",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => locationController.create(req, res),
);

router.put(
  "/locations/:id",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => locationController.update(req, res),
);

router.delete(
  "/locations/:id",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => locationController.delete(req, res),
);

export default router;
