import { prisma } from "../../lib/prisma";
import { Warehouse } from "../model/warehouse.model";

export interface CreateNewWarehouseData {
  name: string;
  address: string;
}

export interface UpdateWarehouseData {
  name: string;
  address: string;
}

export interface IWarehouseRepository {
  find(): Promise<Warehouse[]>;
  findById(id: string): Promise<Warehouse | null>;
  create(data: CreateNewWarehouseData): Promise<Warehouse>;
  update(id: string, data: UpdateWarehouseData): Promise<Warehouse>;
  delete(id: string): Promise<void>;
}

export class PrismaWarehouseRepository implements IWarehouseRepository {
  async find(): Promise<Warehouse[]> {
    const records = await prisma.warehouse.findMany();
    return records.map((record) => Warehouse.create({ ...record }));
  }

  async findById(id: string): Promise<Warehouse | null> {
    const record = await prisma.warehouse.findUnique({ where: { id } });
    if (!record) return null;
    return Warehouse.create({ ...record });
  }

  async create(data: CreateNewWarehouseData): Promise<Warehouse> {
    const record = await prisma.warehouse.create({ data });
    return Warehouse.create({ ...record });
  }

  async update(id: string, data: UpdateWarehouseData): Promise<Product> {
    const record = await prisma.warehouse.update({ where: { id }, data });
    return Warehouse.create({ ...record });
  }

  async delete(id: string): Promise<void> {
    await prisma.warehouse.delete({ where: { id } });
  }
}
