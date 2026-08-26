import { prisma } from "../../lib/prisma";
import { Reception, ReceptionStatus } from "../model/reception.model";

export interface CreateReceptionData {
  reference: string;
  status: ReceptionStatus;
  supplierId: string;
  userId: string;
}

export interface UpdateReceptionData {
  status?: ReceptionStatus;
  date_validation?: Date | null;
}

export interface IReceptionRepository {
  find(): Promise<Reception[]>;
  findById(id: string): Promise<Reception | null>;
  create(data: CreateReceptionData): Promise<Reception>;
  update(id: string, data: UpdateReceptionData): Promise<Reception>;
  delete(id: string): Promise<void>;
}

export class PrismaReceptionRepository implements IReceptionRepository {
  async find(): Promise<Reception[]> {
    const records = await prisma.reception.findMany();
    return records.map((record) =>
      Reception.create({ ...record, status: record.status as ReceptionStatus }),
    );
  }

  async findById(id: string): Promise<Reception | null> {
    const record = await prisma.reception.findUnique({ where: { id } });
    if (!record) return null;
    return Reception.create({
      ...record,
      status: record.status as ReceptionStatus,
    });
  }

  async create(data: CreateReceptionData): Promise<Reception> {
    const record = await prisma.reception.create({ data });
    return Reception.create({
      ...record,
      status: record.status as ReceptionStatus,
    });
  }

  async update(id: string, data: UpdateReceptionData): Promise<Reception> {
    const record = await prisma.reception.update({ where: { id }, data });
    return Reception.create({
      ...record,
      status: record.status as ReceptionStatus,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.reception.delete({ where: { id } });
  }
}
