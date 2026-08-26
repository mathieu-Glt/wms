import {
  PrismaSupplierRepository,
  ISupplierRepository,
  CreateSupplierData,
  UpdateSupplierData,
} from "../repositories/supplier.repository";

export class SupplierService {
  constructor(
    private readonly supplierRepository: ISupplierRepository = new PrismaSupplierRepository(),
  ) {}

  async find() {
    const suppliers = await this.supplierRepository.find();
    return { suppliers };
  }

  async findById(id: string) {
    const supplier = await this.supplierRepository.findById(id);
    if (!supplier) {
      throw new Error("Supplier not found");
    }
    return { supplier };
  }

  async create(data: CreateSupplierData) {
    const existing = await this.supplierRepository.find();
    const duplicate = existing.find(
      (s) => s.email.trim().toLowerCase() === data.email.trim().toLowerCase(),
    );
    if (duplicate) {
      throw new Error("A supplier already exists");
    }

    const supplier = await this.supplierRepository.create(data);
    return { supplier };
  }

  async update(id: string, data: UpdateSupplierData) {
    const existing = await this.supplierRepository.findById(id);
    if (!existing) {
      throw new Error("Supplier not found");
    }

    const supplier = await this.supplierRepository.update(id, data);
    return { supplier };
  }

  async delete(id: string) {
    const existing = await this.supplierRepository.findById(id);
    if (!existing) {
      throw new Error("Supplier not found");
    }

    await this.supplierRepository.delete(id);
    return { message: "Supplier has been deleted" };
  }
}
