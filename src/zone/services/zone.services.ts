import {
  PrismaZoneRepository,
  IZoneRepository,
  CreateZoneData,
  UpdateZoneData,
} from "../repositories/zone.repository";
import {
  PrismaWarehouseRepository,
  IWarehouseRepository,
} from "../../warehouse/repositories/warehouse.repository";
import {
  PrismaLocationRepository,
  ILocationRepository,
} from "../../location/repositories/location.repository";

export class ZoneService {
  constructor(
    private readonly zoneRepository: IZoneRepository = new PrismaZoneRepository(),
    private readonly warehouseRepository: IWarehouseRepository = new PrismaWarehouseRepository(),
    private readonly locationRepository: ILocationRepository = new PrismaLocationRepository(),
  ) {}

  async find() {
    const zones = await this.zoneRepository.find();
    return { zones };
  }

  async findById(id: string) {
    const zone = await this.zoneRepository.findById(id);
    if (!zone) {
      throw new Error("Zone introuvable");
    }
    return { zone };
  }

  async findByWarehouseId(warehouseId: string) {
    const zones = await this.zoneRepository.findByWarehouseId(warehouseId);
    return { zones };
  }

  async create(data: CreateZoneData) {
    const warehouse = await this.warehouseRepository.findById(
      data.warehouse_id,
    );
    if (!warehouse) {
      throw new Error("L'entrepôt rattaché est introuvable");
    }

    const zone = await this.zoneRepository.create(data);
    return { zone };
  }

  async update(id: string, data: UpdateZoneData) {
    const existing = await this.zoneRepository.findById(id);
    if (!existing) {
      throw new Error("Zone introuvable");
    }

    const zone = await this.zoneRepository.update(id, data);
    return { zone };
  }

  async delete(id: string) {
    const existing = await this.zoneRepository.findById(id);
    if (!existing) {
      throw new Error("Zone introuvable");
    }

    const locationCount = await this.locationRepository.countByZoneId(id);
    if (locationCount > 0) {
      throw new Error(
        "Impossible de supprimer cette zone : des emplacements y sont encore rattachés",
      );
    }

    await this.zoneRepository.delete(id);
    return { message: "Zone supprimée" };
  }
}
