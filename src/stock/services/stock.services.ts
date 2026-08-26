import {
  PrismaStockRepository,
  IStockRepository,
  CreateStockData,
} from "../repositories/stock.repository";
import {
  PrismaProductRepository,
  IProductRepository,
} from "../../product/repositories/product.repository";
import {
  PrismaLocationRepository,
  ILocationRepository,
} from "../../location/repositories/location.repository";

export class StockService {
  constructor(
    private readonly stockRepository: IStockRepository = new PrismaStockRepository(),
    private readonly productRepository: IProductRepository = new PrismaProductRepository(),
    private readonly locationRepository: ILocationRepository = new PrismaLocationRepository(),
  ) {}

  async find() {
    const stocks = await this.stockRepository.find();
    return { stocks };
  }

  async findById(id: string) {
    const stock = await this.stockRepository.findById(id);
    if (!stock) {
      throw new Error("Ligne de stock introuvable");
    }
    return { stock };
  }

  async findByProductId(productId: string) {
    const stocks = await this.stockRepository.findByProductId(productId);
    return { stocks };
  }

  async findByLocationId(locationId: string) {
    const stocks = await this.stockRepository.findByLocationId(locationId);
    return { stocks };
  }

  async create(data: CreateStockData) {
    const product = await this.productRepository.findById(data.productId);
    if (!product) {
      throw new Error("Le produit rattaché est introuvable");
    }

    const location = await this.locationRepository.findById(data.locationId);
    if (!location) {
      throw new Error("L'emplacement rattaché est introuvable");
    }

    const existing = await this.stockRepository.findByProductAndLocation(
      data.productId,
      data.locationId,
    );
    if (existing) {
      throw new Error(
        "Une ligne de stock existe déjà pour ce produit à cet emplacement",
      );
    }

    const stock = await this.stockRepository.create(data);
    return { stock };
  }

  async adjustQuantity(productId: string, locationId: string, delta: number) {
    const existing = await this.stockRepository.findByProductAndLocation(
      productId,
      locationId,
    );

    if (!existing) {
      if (delta < 0) {
        throw new Error("Impossible de retirer du stock inexistant");
      }
      return this.create({ productId, locationId, quantite: delta });
    }

    const newQuantite = existing.quantite + delta;
    if (newQuantite < 0) {
      throw new Error("Stock insuffisant à cet emplacement");
    }

    const stock = await this.stockRepository.update(existing.id!, {
      quantite: newQuantite,
    });
    return { stock };
  }

  async delete(id: string) {
    const existing = await this.stockRepository.findById(id);
    if (!existing) {
      throw new Error("Ligne de stock introuvable");
    }

    if (existing.quantite > 0) {
      throw new Error(
        "Impossible de supprimer une ligne de stock non vide : videz-la d'abord via un mouvement",
      );
    }

    await this.stockRepository.delete(id);
    return { message: "Ligne de stock supprimée" };
  }
}
