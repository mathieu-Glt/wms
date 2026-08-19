import { Request, Response } from "express";
import { WarehouseService } from "../services/warehouse.service";

const warehouseService = new WarehouseService();

export class WarehouseController {
  async find(req: Request, res: Response) {
    try {
      const warehouses = await warehouseService.find();
      return res.status(200).json({
        msg: "Request succesfully",
        ...warehouses,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(500).json({ error: message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const warehouse = await warehouseService.findById(id);
      return res.status(200).json({
        msg: "Request successfully",
        ...warehouse,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(404).json({ error: message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, address } = req.body;

      if (!name || address === undefined) {
        return res.status(400).json({ error: "field missing" });
      }

      const warehouse = await warehouseService.create({
        name,
        address,
      });

      return res.status(201).json({
        msg: "Request successfully",
        ...warehouse,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(400).json({ error: message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await warehouseService.update(id, req.body);
      return res.status(200).json({
        msg: "Request successfully",
        ...product,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(400).json({ error: message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await warehouseService.delete(id);
      return res.status(200).json({
        msg: "Request successfully",
        ...result,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(404).json({ error: message });
    }
  }
}
