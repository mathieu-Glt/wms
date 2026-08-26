import { prisma } from "../../lib/prisma";
import { Stock } from "../model/stock.model";

export interface CreateStockData {
  productId: string;
  locationId: string;
  quantite: number;
}

export interface UpdateStockData {
  quantite: number;
}

export interface IStockRepository {
  find(): Promise<Stock[]>;
  findById(id: string): Promise<Stock | null>;
  findByProductId(productId: string): Promise<Stock[]>;
  findByLocationId(locationId: string): Promise<Stock[]>;
  findByProductAndLocation(
    productId: string,
    locationId: string,
  ): Promise<Stock | null>;
  countByLocationId(locationId: string): Promise<number>;
  create(data: CreateStockData): Promise<Stock>;
  update(id: string, data: UpdateStockData): Promise<Stock>;
  delete(id: string): Promise<void>;
}

export class PrismaStockRepository implements IStockRepository {
  async find(): Promise<Stock[]> {
    const records = await prisma.stock.findMany();
    return records.map((record) => Stock.create({ ...record }));
  }

  async findById(id: string): Promise<Stock | null> {
    const record = await prisma.stock.findUnique({ where: { id } });
    if (!record) return null;
    return Stock.create({ ...record });
  }

  async findByProductId(productId: string): Promise<Stock[]> {
    const records = await prisma.stock.findMany({ where: { productId } });
    return records.map((record) => Stock.create({ ...record }));
  }

  async findByLocationId(locationId: string): Promise<Stock[]> {
    const records = await prisma.stock.findMany({ where: { locationId } });
    return records.map((record) => Stock.create({ ...record }));
  }

  async findByProductAndLocation(
    productId: string,
    locationId: string,
  ): Promise<Stock | null> {
    const record = await prisma.stock.findUnique({
      where: { productId_locationId: { productId, locationId } },
    });
    if (!record) return null;
    return Stock.create({ ...record });
  }

  async countByLocationId(locationId: string): Promise<number> {
    return prisma.stock.count({ where: { locationId } });
  }

  async create(data: CreateStockData): Promise<Stock> {
    const record = await prisma.stock.create({ data });
    return Stock.create({ ...record });
  }

  async update(id: string, data: UpdateStockData): Promise<Stock> {
    const record = await prisma.stock.update({ where: { id }, data });
    return Stock.create({ ...record });
  }

  async delete(id: string): Promise<void> {
    await prisma.stock.delete({ where: { id } });
  }
}
