import { prisma } from "../../lib/prisma";
import { LigneReception } from "../model/ligne_reception.model";

export interface CreateLigneReceptionData {
  quantite_prevue: number;
  quantite_recue: number;
  receptionId: string;
  productId: string;
  locationId: string;
}

export interface UpdateLigneReceptionData {
  quantite_recue?: number;
}

export interface ILigneReceptionRepository {
  findByReceptionId(receptionId: string): Promise<LigneReception[]>;
  findById(id: string): Promise<LigneReception | null>;
  create(data: CreateLigneReceptionData): Promise<LigneReception>;
  update(id: string, data: UpdateLigneReceptionData): Promise<LigneReception>;
}

export class PrismaLigneReceptionRepository implements ILigneReceptionRepository {
  async findByReceptionId(receptionId: string): Promise<LigneReception[]> {
    const records = await prisma.ligneReception.findMany({
      where: { receptionId },
    });
    return records.map((record) => LigneReception.create({ ...record }));
  }

  async findById(id: string): Promise<LigneReception | null> {
    const record = await prisma.ligneReception.findUnique({ where: { id } });
    if (!record) return null;
    return LigneReception.create({ ...record });
  }

  async create(data: CreateLigneReceptionData): Promise<LigneReception> {
    const record = await prisma.ligneReception.create({ data });
    return LigneReception.create({ ...record });
  }

  async update(
    id: string,
    data: UpdateLigneReceptionData,
  ): Promise<LigneReception> {
    const record = await prisma.ligneReception.update({ where: { id }, data });
    return LigneReception.create({ ...record });
  }
}
