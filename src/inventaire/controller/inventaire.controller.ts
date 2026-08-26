import { Request, Response } from "express";
import { InventaireService } from "../services/inventaire.service";

const inventaireService = new InventaireService();

export class InventaireController {
  async find(req: Request, res: Response) {
    try {
      const result = await inventaireService.find();
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Server Error";
      return res.status(500).json({ error: message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await inventaireService.findById(id);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Server Error";
      return res.status(404).json({ error: message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { locationId, userCreationId, productIds } = req.body;

      if (!locationId || !userCreationId) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const result = await inventaireService.create({
        locationId,
        userCreationId,
        productIds: productIds ?? [],
      });

      return res.status(201).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Server Error";
      return res.status(400).json({ error: message });
    }
  }

  async validate(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userValidationId, lignes } = req.body;

      if (!userValidationId || !lignes || !Array.isArray(lignes)) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const result = await inventaireService.validate(id, {
        userValidationId,
        lignes,
      });
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Server Error";
      return res.status(400).json({ error: message });
    }
  }
}
