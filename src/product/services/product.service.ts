import {
  PrismaProductRepository,
  IProductRepository,
  CreateNewProductData,
  UpdateNewProductData,
} from "../repositories/product.repository";

export class ProductService {
  constructor(
    private readonly productRepository: IProductRepository = new PrismaProductRepository(),
  ) {}

  async find() {
    const products = await this.productRepository.find();
    return { products };
  }

  async findById(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return { product };
  }

  async create(data: CreateNewProductData) {
    const products = await this.productRepository.find();
    const existing = products.find((p) => p.reference === data.reference);
    if (existing) {
      throw new Error("A product already exists with this reference");
    }

    const product = await this.productRepository.create(data);
    return { product };
  }

  async update(id: string, data: UpdateNewProductData) {
    const existing = await this.productRepository.findById(id);
    if (!existing) {
      throw new Error("Product not found");
    }

    const product = await this.productRepository.update(id, data);
    return { product };
  }

  async delete(id: string) {
    const existing = await this.productRepository.findById(id);
    if (!existing) {
      throw new Error("Product not found");
    }

    await this.productRepository.delete(id);
    return { message: "Product deleted" };
  }
}
