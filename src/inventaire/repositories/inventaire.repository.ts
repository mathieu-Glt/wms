import { prisma } from "../../lib/prisma";
import { Inventaire, InventaireStatut } from "../model/inventaire.model";

export interface CreateInventaireData {
  statut: InventaireStatut;
  locationId: string;
  userCreationId: string;
}

export interface UpdateInventaireData {
  statut?: InventaireStatut;
  date_validation?: Date | null;
  userValidationId?: string | null;
}

export interface IInventaireRepository {
  find(): Promise<Inventaire[]>;
  findById(id: string): Promise<Inventaire | null>;
  create(data: CreateInventaireData): Promise<Inventaire>;
  update(id: string, data: UpdateInventaireData): Promise<Inventaire>;
}

export class PrismaInventaireRepository implements IInventaireRepository {
  async find(): Promise<Inventaire[]> {
    const records = await prisma.inventaire.findMany();
    return records.map((record) =>
      Inventaire.create({
        ...record,
        statut: record.statut as InventaireStatut,
      }),
    );
  }

  async findById(id: string): Promise<Inventaire | null> {
    const record = await prisma.inventaire.findUnique({ where: { id } });
    if (!record) return null;
    return Inventaire.create({
      ...record,
      statut: record.statut as InventaireStatut,
    });
  }

  async create(data: CreateInventaireData): Promise<Inventaire> {
    const record = await prisma.inventaire.create({ data });
    return Inventaire.create({
      ...record,
      statut: record.statut as InventaireStatut,
    });
  }

  async update(id: string, data: UpdateInventaireData): Promise<Inventaire> {
    const record = await prisma.inventaire.update({ where: { id }, data });
    return Inventaire.create({
      ...record,
      statut: record.statut as InventaireStatut,
    });
  }
}
