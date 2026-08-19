import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

const productService = new ProductService();
export class ProductController {
  async find(req: Request, res: Response) {
    try {
      const products = await productService.find();
      return res.status(200).json({
        msg: "Request succesfully",
        ...products,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(500).json({ error: message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await productService.findById(id);
      return res.status(200).json({
        msg: "Request successfully",
        ...product,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(404).json({ error: message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        reference,
        name,
        describe,
        code_barre,
        unite,
        stock_minimum,
        actif,
      } = req.body;

      if (
        !reference ||
        !name ||
        !code_barre ||
        !unite ||
        stock_minimum === undefined
      ) {
        return res.status(400).json({ error: "Champs manquants" });
      }

      const product = await productService.create({
        reference,
        name,
        describe,
        code_barre,
        unite,
        stock_minimum,
        actif: actif ?? true,
      });

      return res.status(201).json({
        msg: "Request successfully",
        ...product,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(400).json({ error: message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await productService.update(id, req.body);
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
      const result = await productService.delete(id);
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
