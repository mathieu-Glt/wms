import { Request, Response } from "express";
import { LocationService } from "../services/location.services";

const locationService = new LocationService();

export class LocationController {
  async find(req: Request, res: Response) {
    try {
      const result = await locationService.find();
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(500).json({ error: message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await locationService.findById(id);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(404).json({ error: message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, code, capacity, actif, zoneId } = req.body;

      if (!name || !code || capacity === undefined || !zoneId) {
        return res.status(400).json({ error: "Champs manquants" });
      }

      const result = await locationService.create({
        name,
        code,
        capacity,
        actif: actif ?? true,
        zoneId,
      });

      return res.status(201).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(400).json({ error: message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await locationService.update(id, req.body);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(400).json({ error: message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await locationService.delete(id);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(400).json({ error: message });
    }
  }
}
