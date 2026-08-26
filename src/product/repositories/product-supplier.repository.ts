import { prisma } from "../../lib/prisma";

export interface IProductSupplierRepository {
  linkProductToSupplier(productId: string, supplierId: string): Promise<void>;
  unlinkProductFromSupplier(
    productId: string,
    supplierId: string,
  ): Promise<void>;
  findSupplierIdsByProductId(productId: string): Promise<string[]>;
  findProductIdsBySupplierId(supplierId: string): Promise<string[]>;
  isLinked(productId: string, supplierId: string): Promise<boolean>;
}

export class PrismaProductSupplierRepository implements IProductSupplierRepository {
  async linkProductToSupplier(
    productId: string,
    supplierId: string,
  ): Promise<void> {
    await prisma.productSupplier.create({ data: { productId, supplierId } });
  }

  async unlinkProductFromSupplier(
    productId: string,
    supplierId: string,
  ): Promise<void> {
    await prisma.productSupplier.deleteMany({
      where: { productId, supplierId },
    });
  }

  async findSupplierIdsByProductId(productId: string): Promise<string[]> {
    const records = await prisma.productSupplier.findMany({
      where: { productId },
      select: { supplierId: true },
    });
    return records.map((r) => r.supplierId);
  }

  async findProductIdsBySupplierId(supplierId: string): Promise<string[]> {
    const records = await prisma.productSupplier.findMany({
      where: { supplierId },
      select: { productId: true },
    });
    return records.map((r) => r.productId);
  }

  async isLinked(productId: string, supplierId: string): Promise<boolean> {
    const record = await prisma.productSupplier.findUnique({
      where: { productId_supplierId: { productId, supplierId } },
    });
    return record !== null;
  }
}
