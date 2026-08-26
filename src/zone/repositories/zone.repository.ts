import { prisma } from "../../lib/prisma";
import { Zone } from "../model/zone.model";

export interface CreateZoneData {
  name: string;
  code: string;
  warehouse_id: string;
}

export interface UpdateZoneData {
  name?: string;
  code?: string;
}

export interface IZoneRepository {
  find(): Promise<Zone[]>;
  findById(id: string): Promise<Zone | null>;
  findByWarehouseId(warehouseId: string): Promise<Zone[]>;
  create(data: CreateZoneData): Promise<Zone>;
  update(id: string, data: UpdateZoneData): Promise<Zone>;
  delete(id: string): Promise<void>;
}

export class PrismaZoneRepository implements IZoneRepository {
  async find(): Promise<Zone[]> {
    const records = await prisma.zone.findMany();
    return records.map((record) => Zone.create({ ...record }));
  }

  async findById(id: string): Promise<Zone | null> {
    const record = await prisma.zone.findUnique({ where: { id } });
    if (!record) return null;
    return Zone.create({ ...record });
  }

  async findByWarehouseId(warehouseId: string): Promise<Zone[]> {
    const records = await prisma.zone.findMany({
      where: { warehouse_id: warehouseId },
    });
    return records.map((record) => Zone.create({ ...record }));
  }

  async create(data: CreateZoneData): Promise<Zone> {
    const record = await prisma.zone.create({ data });
    return Zone.create({ ...record });
  }

  async update(id: string, data: UpdateZoneData): Promise<Zone> {
    const record = await prisma.zone.update({ where: { id }, data });
    return Zone.create({ ...record });
  }

  async delete(id: string): Promise<void> {
    await prisma.zone.delete({ where: { id } });
  }
}
