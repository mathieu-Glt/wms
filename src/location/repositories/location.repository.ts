import { prisma } from "../../lib/prisma";
import { Location } from "../model/location.model";

export interface CreateLocationData {
  name: string;
  code: string;
  capacity: number;
  actif: boolean;
  zoneId: string;
}

export interface UpdateLocationData {
  name?: string;
  code?: string;
  capacity?: number;
  actif?: boolean;
}

export interface ILocationRepository {
  find(): Promise<Location[]>;
  findById(id: string): Promise<Location | null>;
  findByZoneId(zoneId: string): Promise<Location[]>;
  countByZoneId(zoneId: string): Promise<number>;
  create(data: CreateLocationData): Promise<Location>;
  update(id: string, data: UpdateLocationData): Promise<Location>;
  delete(id: string): Promise<void>;
}

export class PrismaLocationRepository implements ILocationRepository {
  async find(): Promise<Location[]> {
    const records = await prisma.location.findMany();
    return records.map((record) => Location.create({ ...record }));
  }

  async findById(id: string): Promise<Location | null> {
    const record = await prisma.location.findUnique({ where: { id } });
    if (!record) return null;
    return Location.create({ ...record });
  }

  async findByZoneId(zoneId: string): Promise<Location[]> {
    const records = await prisma.location.findMany({ where: { zoneId } });
    return records.map((record) => Location.create({ ...record }));
  }

  async countByZoneId(zoneId: string): Promise<number> {
    return prisma.location.count({ where: { zoneId } });
  }

  async create(data: CreateLocationData): Promise<Location> {
    const record = await prisma.location.create({ data });
    return Location.create({ ...record });
  }

  async update(id: string, data: UpdateLocationData): Promise<Location> {
    const record = await prisma.location.update({ where: { id }, data });
    return Location.create({ ...record });
  }

  async delete(id: string): Promise<void> {
    await prisma.location.delete({ where: { id } });
  }
}
