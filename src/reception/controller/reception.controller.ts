import { Request, Response } from "express";
import { ReceptionService } from "../services/reception.services";

const receptionService = new ReceptionService();

export class ReceptionController {
  async find(req: Request, res: Response) {
    try {
      const result = await receptionService.find();
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(500).json({ error: message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await receptionService.findById(id);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(404).json({ error: message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { reference, supplierId, userId, lignes } = req.body;

      if (!reference || !supplierId || !userId) {
        return res.status(400).json({ error: "Champs manquants" });
      }

      const result = await receptionService.create({
        reference,
        supplierId,
        userId,
        lignes: lignes ?? [],
      });

      return res.status(201).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(400).json({ error: message });
    }
  }

  async validate(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { lignes } = req.body;

      if (!lignes || !Array.isArray(lignes)) {
        return res
          .status(400)
          .json({ error: "La liste des lignes reçues est requise" });
      }

      const result = await receptionService.validate(id, lignes);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(400).json({ error: message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await receptionService.delete(id);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(400).json({ error: message });
    }
  }
}
