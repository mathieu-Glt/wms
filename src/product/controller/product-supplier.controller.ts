import { Request, Response } from "express";
import { ProductSupplierService } from "../services/product-supplier.service";

const productSupplierService = new ProductSupplierService();

export class ProductSupplierController {
  async link(req: Request, res: Response) {
    try {
      const { productId, supplierId } = req.body;

      if (!productId || !supplierId) {
        return res
          .status(400)
          .json({ error: "productId et supplierId requis" });
      }

      const result = await productSupplierService.link(productId, supplierId);
      return res.status(201).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(400).json({ error: message });
    }
  }

  async unlink(req: Request, res: Response) {
    try {
      const { productId, supplierId } = req.params;
      const result = await productSupplierService.unlink(productId, supplierId);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(400).json({ error: message });
    }
  }

  async findSuppliersByProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const result =
        await productSupplierService.findSuppliersByProduct(productId);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(500).json({ error: message });
    }
  }

  async findProductsBySupplier(req: Request, res: Response) {
    try {
      const { supplierId } = req.params;
      const result =
        await productSupplierService.findProductsBySupplier(supplierId);
      return res.status(200).json({ msg: "Request successfully", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(500).json({ error: message });
    }
  }
}
