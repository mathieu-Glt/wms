import {
  PrismaReceptionRepository,
  IReceptionRepository,
} from "../repositories/reception.repository";
import {
  PrismaLigneReceptionRepository,
  ILigneReceptionRepository,
} from "../repositories/ligne_reception.repository";
import {
  PrismaSupplierRepository,
  ISupplierRepository,
} from "../../supplier/repositories/supplier.repository";
import {
  PrismaUserRepository,
  IUserRepository,
} from "../../user/repositories/user.repository";
import { StockService } from "../../stock/services/stock.services";

interface CreateReceptionLigneInput {
  productId: string;
  locationId: string;
  quantite_prevue: number;
}

interface CreateReceptionInput {
  reference: string;
  supplierId: string;
  userId: string;
  lignes: CreateReceptionLigneInput[];
}

interface ValidateReceptionLigneInput {
  ligneId: string;
  quantite_recue: number;
}

export class ReceptionService {
  constructor(
    private readonly receptionRepository: IReceptionRepository = new PrismaReceptionRepository(),
    private readonly ligneReceptionRepository: ILigneReceptionRepository = new PrismaLigneReceptionRepository(),
    private readonly supplierRepository: ISupplierRepository = new PrismaSupplierRepository(),
    private readonly userRepository: IUserRepository = new PrismaUserRepository(),
    private readonly stockService: StockService = new StockService(),
  ) {}

  async find() {
    const receptions = await this.receptionRepository.find();
    return { receptions };
  }

  async findById(id: string) {
    const reception = await this.receptionRepository.findById(id);
    if (!reception) {
      throw new Error("Réception introuvable");
    }
    const lignes = await this.ligneReceptionRepository.findByReceptionId(id);
    return { reception, lignes };
  }

  async create(data: CreateReceptionInput) {
    const supplier = await this.supplierRepository.findById(data.supplierId);
    if (!supplier) {
      throw new Error("Le fournisseur est introuvable");
    }

    const user = await this.userRepository.findById(data.userId);
    if (!user) {
      throw new Error("L'utilisateur créateur est introuvable");
    }

    if (!data.lignes || data.lignes.length === 0) {
      throw new Error("La réception doit contenir au moins une ligne");
    }

    const reception = await this.receptionRepository.create({
      reference: data.reference,
      status: "BROUILLON",
      supplierId: data.supplierId,
      userId: data.userId,
    });

    const lignes = [];
    for (const ligne of data.lignes) {
      const created = await this.ligneReceptionRepository.create({
        receptionId: reception.id!,
        productId: ligne.productId,
        locationId: ligne.locationId,
        quantite_prevue: ligne.quantite_prevue,
        quantite_recue: 0,
      });
      lignes.push(created);
    }

    return { reception, lignes };
  }

  async validate(id: string, lignesRecues: ValidateReceptionLigneInput[]) {
    const reception = await this.receptionRepository.findById(id);
    if (!reception) {
      throw new Error("Réception introuvable");
    }
    if (reception.status !== "BROUILLON") {
      throw new Error(
        "Seule une réception au statut BROUILLON peut être validée",
      );
    }

    for (const input of lignesRecues) {
      const ligne = await this.ligneReceptionRepository.findById(input.ligneId);
      if (!ligne || ligne.receptionId !== id) {
        throw new Error("Ligne de réception introuvable pour cette réception");
      }

      await this.ligneReceptionRepository.update(input.ligneId, {
        quantite_recue: input.quantite_recue,
      });

      await this.stockService.adjustQuantity(
        ligne.productId,
        ligne.locationId,
        input.quantite_recue,
      );
    }

    const updated = await this.receptionRepository.update(id, {
      status: "VALIDEE",
      date_validation: new Date(),
    });

    return { reception: updated };
  }

  async delete(id: string) {
    const existing = await this.receptionRepository.findById(id);
    if (!existing) {
      throw new Error("Réception introuvable");
    }
    if (existing.status === "VALIDEE") {
      throw new Error("Impossible de supprimer une réception déjà validée");
    }

    await this.receptionRepository.delete(id);
    return { message: "Réception supprimée" };
  }
}
