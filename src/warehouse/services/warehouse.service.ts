import {
  PrismaWarehouseRepository,
  IWarehouseRepository,
  CreateNewWarehouseData,
  UpdateWarehouseData,
} from "../repositories/warehouse.repository";

export class WarehouseService {
  constructor(
    private readonly warehouseRepository: IWarehouseRepository = new PrismaWarehouseRepository(),
  ) {}

  async find() {
    const warehouses = await this.warehouseRepository.find();
    return { warehouses };
  }

  async findById(id: string) {
    const warehouse = await this.warehouseRepository.findById(id);
    if (!warehouse) {
      throw new Error("Warehouse not found");
    }
    return { warehouse };
  }

  async create(data: CreateNewWarehouseData) {
    const warehouses = await this.warehouseRepository.find();
    const existing = warehouses.find((w) => w.name === data.name);
    if (existing) {
      throw new Error("A warehouse already exists with this reference");
    }

    const warehouse = await this.warehouseRepository.create(data);
    return { warehouse };
  }

  async update(id: string, data: UpdateWarehouseData) {
    const existing = await this.warehouseRepository.findById(id);
    if (!existing) {
      throw new Error("Warehouse not found");
    }

    const product = await this.warehouseRepository.update(id, data);
    return { product };
  }

  async delete(id: string) {
    const existing = await this.warehouseRepository.findById(id);
    if (!existing) {
      throw new Error("Warehouse not found");
    }

    await this.warehouseRepository.delete(id);
    return { message: "Product deleted" };
  }
}
