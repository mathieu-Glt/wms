import {
  PrismaMouvementRepository,
  IMouvementRepository,
  CreateMouvementData,
} from "../repositories/mouvement.repository";
import {
  PrismaProductRepository,
  IProductRepository,
} from "../../product/repositories/product.repository";
import {
  PrismaLocationRepository,
  ILocationRepository,
} from "../../location/repositories/location.repository";
import {
  PrismaUserRepository,
  IUserRepository,
} from "../../user/repositories/user.repository";
import { StockService } from "../../stock/services/stock.services";

export class MouvementService {
  constructor(
    private readonly mouvementRepository: IMouvementRepository = new PrismaMouvementRepository(),
    private readonly productRepository: IProductRepository = new PrismaProductRepository(),
    private readonly locationRepository: ILocationRepository = new PrismaLocationRepository(),
    private readonly userRepository: IUserRepository = new PrismaUserRepository(),
    private readonly stockService: StockService = new StockService(),
  ) {}

  async find() {
    const mouvements = await this.mouvementRepository.find();
    return { mouvements };
  }

  async findById(id: string) {
    const mouvement = await this.mouvementRepository.findById(id);
    if (!mouvement) {
      throw new Error("Mouvement introuvable");
    }
    return { mouvement };
  }

  async findByProductId(productId: string) {
    const mouvements =
      await this.mouvementRepository.findByProductId(productId);
    return { mouvements };
  }

  async create(data: CreateMouvementData) {
    const product = await this.productRepository.findById(data.productId);
    if (!product) {
      throw new Error("Le produit est introuvable");
    }

    const source = await this.locationRepository.findById(
      data.locationSourceId,
    );
    if (!source) {
      throw new Error("L'emplacement source est introuvable");
    }

    const destination = await this.locationRepository.findById(
      data.locationDestinationId,
    );
    if (!destination) {
      throw new Error("L'emplacement destination est introuvable");
    }

    const user = await this.userRepository.findById(data.userId);
    if (!user) {
      throw new Error("L'utilisateur est introuvable");
    }

    await this.stockService.adjustQuantity(
      data.productId,
      data.locationSourceId,
      -data.quantite,
    );

    await this.stockService.adjustQuantity(
      data.productId,
      data.locationDestinationId,
      data.quantite,
    );

    const mouvement = await this.mouvementRepository.create(data);

    return { mouvement };
  }
}
