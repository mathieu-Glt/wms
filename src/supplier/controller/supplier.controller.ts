import { Request, Response } from "express";
import { SupplierService } from "../services/supplier.services";

const supplierService = new SupplierService();

export class SupplierController {
  async find(req: Request, res: Response) {
    try {
      const result = await supplierService.find();
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(500).json({ error: message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await supplierService.findById(id);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(404).json({ error: message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, email, phone, address, city, zip_code, country } = req.body;

      if (
        !name ||
        !email ||
        !phone ||
        !address ||
        !city ||
        !zip_code ||
        !country
      ) {
        return res.status(400).json({ error: "Champs manquants" });
      }

      const result = await supplierService.create({
        name,
        email,
        phone,
        address,
        city,
        zip_code,
        country,
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
      const result = await supplierService.update(id, req.body);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(400).json({ error: message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await supplierService.delete(id);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(400).json({ error: message });
    }
  }
}
