import {
  PrismaLocationRepository,
  ILocationRepository,
  CreateLocationData,
  UpdateLocationData,
} from "../repositories/location.repository";
import {
  PrismaZoneRepository,
  IZoneRepository,
} from "../../zone/repositories/zone.repository";
import {
  PrismaStockRepository,
  IStockRepository,
} from "../../stock/repositories/stock.repository";

export class LocationService {
  constructor(
    private readonly locationRepository: ILocationRepository = new PrismaLocationRepository(),
    private readonly zoneRepository: IZoneRepository = new PrismaZoneRepository(),
    private readonly stockRepository: IStockRepository = new PrismaStockRepository(),
  ) {}

  async find() {
    const locations = await this.locationRepository.find();
    return { locations };
  }

  async findById(id: string) {
    const location = await this.locationRepository.findById(id);
    if (!location) {
      throw new Error("Emplacement introuvable");
    }
    return { location };
  }

  async findByZoneId(zoneId: string) {
    const locations = await this.locationRepository.findByZoneId(zoneId);
    return { locations };
  }

  async create(data: CreateLocationData) {
    const zone = await this.zoneRepository.findById(data.zoneId);
    if (!zone) {
      throw new Error("La zone rattachée est introuvable");
    }

    const location = await this.locationRepository.create(data);
    return { location };
  }

  async update(id: string, data: UpdateLocationData) {
    const existing = await this.locationRepository.findById(id);
    if (!existing) {
      throw new Error("Emplacement introuvable");
    }

    const location = await this.locationRepository.update(id, data);
    return { location };
  }

  async delete(id: string) {
    const existing = await this.locationRepository.findById(id);
    if (!existing) {
      throw new Error("Emplacement introuvable");
    }

    // const stockCount = await this.stockRepository.countByLocationId(id);
    // if (stockCount > 0) {
    //   throw new Error(
    //     "Impossible de supprimer cet emplacement : du stock y est encore présent"
    //   );
    // }

    await this.locationRepository.delete(id);
    return { message: "Emplacement supprimé" };
  }
}
