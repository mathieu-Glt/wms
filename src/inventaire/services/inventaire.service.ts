import {
  PrismaInventaireRepository,
  IInventaireRepository,
} from "../repositories/inventaire.repository";
import {
  PrismaLigneInventaireRepository,
  ILigneInventaireRepository,
} from "../repositories/ligne-inventaire.repositories";
import {
  PrismaLocationRepository,
  ILocationRepository,
} from "../../location/repositories/location.repository";
import {
  PrismaUserRepository,
  IUserRepository,
} from "../../user/repositories/user.repository";
import {
  PrismaStockRepository,
  IStockRepository,
} from "../../stock/repositories/stock.repository";
import { StockService } from "../../stock/services/stock.services";

interface CreateInventaireInput {
  locationId: string;
  userCreationId: string;
  productIds: string[];
}

interface ValidateInventaireLigneInput {
  ligneId: string;
  quantite_reelle: number;
}

interface ValidateInventaireInput {
  userValidationId: string;
  lignes: ValidateInventaireLigneInput[];
}

export class InventaireService {
  constructor(
    private readonly inventaireRepository: IInventaireRepository = new PrismaInventaireRepository(),
    private readonly ligneInventaireRepository: ILigneInventaireRepository = new PrismaLigneInventaireRepository(),
    private readonly locationRepository: ILocationRepository = new PrismaLocationRepository(),
    private readonly userRepository: IUserRepository = new PrismaUserRepository(),
    private readonly stockRepository: IStockRepository = new PrismaStockRepository(),
    private readonly stockService: StockService = new StockService(),
  ) {}

  async find() {
    const inventaires = await this.inventaireRepository.find();
    return { inventaires };
  }

  async findById(id: string) {
    const inventaire = await this.inventaireRepository.findById(id);
    if (!inventaire) {
      throw new Error("Inventaire introuvable");
    }
    const lignes = await this.ligneInventaireRepository.findByInventaireId(id);
    return { inventaire, lignes };
  }

  async create(data: CreateInventaireInput) {
    const location = await this.locationRepository.findById(data.locationId);
    if (!location) {
      throw new Error("L'emplacement est introuvable");
    }

    const user = await this.userRepository.findById(data.userCreationId);
    if (!user) {
      throw new Error("L'utilisateur créateur est introuvable");
    }

    if (!data.productIds || data.productIds.length === 0) {
      throw new Error("L'inventaire doit porter sur au moins un produit");
    }

    const inventaire = await this.inventaireRepository.create({
      statut: "EN_COURS",
      locationId: data.locationId,
      userCreationId: data.userCreationId,
    });

    const lignes = [];
    for (const productId of data.productIds) {
      const stock = await this.stockRepository.findByProductAndLocation(
        productId,
        data.locationId,
      );
      const quantite_theorique = stock?.quantite ?? 0;

      const ligne = await this.ligneInventaireRepository.create({
        inventaireId: inventaire.id!,
        productId,
        quantite_theorique,
        quantite_reelle: quantite_theorique, // valeur par défaut, corrigée à la validation
      });
      lignes.push(ligne);
    }

    return { inventaire, lignes };
  }

  async validate(id: string, data: ValidateInventaireInput) {
    const inventaire = await this.inventaireRepository.findById(id);
    if (!inventaire) {
      throw new Error("Inventaire introuvable");
    }
    if (inventaire.statut !== "EN_COURS") {
      throw new Error("Seul un inventaire EN_COURS peut être validé");
    }

    const validator = await this.userRepository.findById(data.userValidationId);
    if (!validator) {
      throw new Error("L'utilisateur validateur est introuvable");
    }

    for (const input of data.lignes) {
      const ligne = await this.ligneInventaireRepository.findById(
        input.ligneId,
      );
      if (!ligne || ligne.inventaireId !== id) {
        throw new Error("Ligne d'inventaire introuvable pour cet inventaire");
      }

      const ecart = input.quantite_reelle - ligne.quantite_theorique;

      await this.ligneInventaireRepository.update(input.ligneId, {
        quantite_reelle: input.quantite_reelle,
      });

      if (ecart !== 0) {
        await this.stockService.adjustQuantity(
          ligne.productId,
          inventaire.locationId,
          ecart,
        );
      }
    }

    const updated = await this.inventaireRepository.update(id, {
      statut: "VALIDE",
      date_validation: new Date(),
      userValidationId: data.userValidationId,
    });

    return { inventaire: updated };
  }
}
