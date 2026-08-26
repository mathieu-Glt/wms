import { prisma } from "../../lib/prisma";
import { Mouvement } from "../model/mouvement.model";

export interface CreateMouvementData {
  type: string;
  quantite: number;
  motif?: string | null;
  productId: string;
  locationSourceId: string;
  locationDestinationId: string;
  userId: string;
}

export interface IMouvementRepository {
  find(): Promise<Mouvement[]>;
  findById(id: string): Promise<Mouvement | null>;
  findByProductId(productId: string): Promise<Mouvement[]>;
  create(data: CreateMouvementData): Promise<Mouvement>;
}

export class PrismaMouvementRepository implements IMouvementRepository {
  async find(): Promise<Mouvement[]> {
    const records = await prisma.mouvement.findMany();
    return records.map((record) => Mouvement.create({ ...record }));
  }

  async findById(id: string): Promise<Mouvement | null> {
    const record = await prisma.mouvement.findUnique({ where: { id } });
    if (!record) return null;
    return Mouvement.create({ ...record });
  }

  async findByProductId(productId: string): Promise<Mouvement[]> {
    const records = await prisma.mouvement.findMany({ where: { productId } });
    return records.map((record) => Mouvement.create({ ...record }));
  }

  async create(data: CreateMouvementData): Promise<Mouvement> {
    const record = await prisma.mouvement.create({ data });
    return Mouvement.create({ ...record });
  }
}
