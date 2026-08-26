import { Router } from "express";
import { MouvementController } from "../controller/mouvement.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();
const mouvementController = new MouvementController();

router.get("/", authMiddleware, (req, res) =>
  mouvementController.find(req, res),
);
router.get("/:id", authMiddleware, (req, res) =>
  mouvementController.findById(req, res),
);
router.get("/product/:productId", authMiddleware, (req, res) =>
  mouvementController.findByProductId(req, res),
);

router.post("/", authMiddleware, (req, res) =>
  mouvementController.create(req, res),
);

export default router;
