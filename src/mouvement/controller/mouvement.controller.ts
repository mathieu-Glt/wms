import { Request, Response } from "express";
import { MouvementService } from "../services/mouvement.service";

const mouvementService = new MouvementService();

export class MouvementController {
  async find(req: Request, res: Response) {
    try {
      const result = await mouvementService.find();
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(500).json({ error: message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await mouvementService.findById(id);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(404).json({ error: message });
    }
  }

  async findByProductId(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const result = await mouvementService.findByProductId(productId);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(500).json({ error: message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        type,
        quantite,
        motif,
        productId,
        locationSourceId,
        locationDestinationId,
        userId,
      } = req.body;

      if (
        !type ||
        !quantite ||
        !productId ||
        !locationSourceId ||
        !locationDestinationId ||
        !userId
      ) {
        return res.status(400).json({ error: "Champs manquants" });
      }

      const result = await mouvementService.create({
        type,
        quantite,
        motif,
        productId,
        locationSourceId,
        locationDestinationId,
        userId,
      });

      return res.status(201).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(400).json({ error: message });
    }
  }
}
