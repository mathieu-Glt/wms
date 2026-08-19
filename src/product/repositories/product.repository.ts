import { prisma } from "../../lib/prisma";
import { Product } from "../models/product.model";

export interface CreateNewProductData {
  reference: number;
  name: string;
  describe?: string | null;
  code_barre: string;
  unite: string;
  stock_minimum: number;
  actif: boolean;
}

export interface UpdateNewProductData {
  reference?: number;
  name?: string;
  describe?: string | null;
  code_barre?: string;
  unite?: string;
  stock_minimum?: number;
  actif?: boolean;
}

export interface IProductRepository {
  find(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(data: CreateNewProductData): Promise<Product>;
  update(id: string, data: UpdateNewProductData): Promise<Product>;
  delete(id: string): Promise<void>;
}

export class PrismaProductRepository implements IProductRepository {
  async find(): Promise<Product[]> {
    const records = await prisma.product.findMany();
    return records.map((record) => Product.create({ ...record }));
  }

  async findById(id: string): Promise<Product | null> {
    const record = await prisma.product.findUnique({ where: { id } });
    if (!record) return null;
    return Product.create({ ...record });
  }

  async create(data: CreateNewProductData): Promise<Product> {
    const record = await prisma.product.create({ data });
    return Product.create({ ...record });
  }

  async update(id: string, data: UpdateNewProductData): Promise<Product> {
    const record = await prisma.product.update({ where: { id }, data });
    return Product.create({ ...record });
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }
}
