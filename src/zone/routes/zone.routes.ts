import { Router } from "express";
import { ZoneController } from "../controller/zone.controller";
import { authMiddleware, requireRole } from "../../middleware/auth.middleware";

const router = Router();
const zoneController = new ZoneController();

router.get(
  "/zones",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => zoneController.find(req, res),
);
router.get(
  "/zones/:id",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => zoneController.findById(req, res),
);

router.post(
  "/zones",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => zoneController.create(req, res),
);

router.put(
  "/zones/:id",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => zoneController.update(req, res),
);

router.delete(
  "/zones/:id",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  (req, res) => zoneController.delete(req, res),
);

export default router;
