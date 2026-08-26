import { prisma } from "../../lib/prisma";
import { Supplier } from "../model/supplier.model";

export interface CreateSupplierData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip_code: string;
  country: string;
}

export interface UpdateSupplierData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  zip_code?: string;
  country?: string;
}

export interface ISupplierRepository {
  find(): Promise<Supplier[]>;
  findById(id: string): Promise<Supplier | null>;
  create(data: CreateSupplierData): Promise<Supplier>;
  update(id: string, data: UpdateSupplierData): Promise<Supplier>;
  delete(id: string): Promise<void>;
}

export class PrismaSupplierRepository implements ISupplierRepository {
  async find(): Promise<Supplier[]> {
    const records = await prisma.supplier.findMany();
    return records.map((record) => Supplier.create({ ...record }));
  }

  async findById(id: string): Promise<Supplier | null> {
    const record = await prisma.supplier.findUnique({ where: { id } });
    if (!record) return null;
    return Supplier.create({ ...record });
  }

  async create(data: CreateSupplierData): Promise<Supplier> {
    const record = await prisma.supplier.create({ data });
    return Supplier.create({ ...record });
  }

  async update(id: string, data: UpdateSupplierData): Promise<Supplier> {
    const record = await prisma.supplier.update({ where: { id }, data });
    return Supplier.create({ ...record });
  }

  async delete(id: string): Promise<void> {
    await prisma.supplier.delete({ where: { id } });
  }
}
