import { prisma } from "../../lib/prisma";
import { LigneInventaire } from "../model/ligne-inventaire.model";

export interface CreateLigneInventaireData {
  quantite_theorique: number;
  quantite_reelle: number;
  inventaireId: string;
  productId: string;
}

export interface UpdateLigneInventaireData {
  quantite_reelle: number;
}

export interface ILigneInventaireRepository {
  findByInventaireId(inventaireId: string): Promise<LigneInventaire[]>;
  findById(id: string): Promise<LigneInventaire | null>;
  create(data: CreateLigneInventaireData): Promise<LigneInventaire>;
  update(id: string, data: UpdateLigneInventaireData): Promise<LigneInventaire>;
}

export class PrismaLigneInventaireRepository implements ILigneInventaireRepository {
  async findByInventaireId(inventaireId: string): Promise<LigneInventaire[]> {
    const records = await prisma.ligneInventaire.findMany({
      where: { inventaireId },
    });
    return records.map((record) => LigneInventaire.create({ ...record }));
  }

  async findById(id: string): Promise<LigneInventaire | null> {
    const record = await prisma.ligneInventaire.findUnique({ where: { id } });
    if (!record) return null;
    return LigneInventaire.create({ ...record });
  }

  async create(data: CreateLigneInventaireData): Promise<LigneInventaire> {
    const record = await prisma.ligneInventaire.create({ data });
    return LigneInventaire.create({ ...record });
  }

  async update(
    id: string,
    data: UpdateLigneInventaireData,
  ): Promise<LigneInventaire> {
    const record = await prisma.ligneInventaire.update({ where: { id }, data });
    return LigneInventaire.create({ ...record });
  }
}
