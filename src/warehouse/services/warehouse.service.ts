import {
  PrismaWarehouseRepository,
  IWarehouseRepository,
  CreateNewWarehouseData,
  UpdateWarehouseData,
} from "../repositories/warehouse.repository";
import {
  PrismaZoneRepository,
  IZoneRepository,
} from "../../zone/repositories/zone.repository";

export class WarehouseService {
  constructor(
    private readonly warehouseRepository: IWarehouseRepository = new PrismaWarehouseRepository(),
    private readonly zoneRepository: IZoneRepository = new PrismaZoneRepository(),
  ) {}

  async find() {
    const warehouses = await this.warehouseRepository.find();
    return { warehouses };
  }

  async findById(id: string) {
    const warehouse = await this.warehouseRepository.findById(id);
    if (!warehouse) {
      throw new Error("Entrepôt introuvable");
    }
    return { warehouse };
  }

  async create(data: CreateNewWarehouseData) {
    const existing = await this.warehouseRepository.find();
    const duplicate = existing.find(
      (w) => w.name.trim().toLowerCase() === data.name.trim().toLowerCase(),
    );
    if (duplicate) {
      throw new Error("Un entrepôt existe déjà avec ce nom");
    }

    const warehouse = await this.warehouseRepository.create(data);
    return { warehouse };
  }

  async update(id: string, data: UpdateWarehouseData) {
    const existing = await this.warehouseRepository.findById(id);
    if (!existing) {
      throw new Error("Entrepôt introuvable");
    }

    const warehouse = await this.warehouseRepository.update(id, data);
    return { warehouse };
  }

  async delete(id: string) {
    const existing = await this.warehouseRepository.findById(id);
    if (!existing) {
      throw new Error("Entrepôt introuvable");
    }

    const zones = await this.zoneRepository.findByWarehouseId(id);
    if (zones.length > 0) {
      throw new Error(
        "Impossible de supprimer cet entrepôt : des zones y sont encore rattachées",
      );
    }

    await this.warehouseRepository.delete(id);
    return { message: "Entrepôt supprimé" };
  }
}
