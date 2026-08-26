import { Request, Response } from "express";
import { StockService } from "../services/stock.services";

const stockService = new StockService();

export class StockController {
  async find(req: Request, res: Response) {
    try {
      const result = await stockService.find();
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(500).json({ error: message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await stockService.findById(id);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(404).json({ error: message });
    }
  }

  async findByProductId(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const result = await stockService.findByProductId(productId);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(500).json({ error: message });
    }
  }

  async findByLocationId(req: Request, res: Response) {
    try {
      const { locationId } = req.params;
      const result = await stockService.findByLocationId(locationId);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(500).json({ error: message });
    }
  }
}
