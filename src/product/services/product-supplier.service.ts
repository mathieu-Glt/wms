import {
  PrismaProductSupplierRepository,
  IProductSupplierRepository,
} from "../repositories/product-supplier.repository";
import {
  PrismaProductRepository,
  IProductRepository,
} from "../repositories/product.repository";
import {
  PrismaSupplierRepository,
  ISupplierRepository,
} from "../../supplier/repositories/supplier.repository";

export class ProductSupplierService {
  constructor(
    private readonly productSupplierRepository: IProductSupplierRepository = new PrismaProductSupplierRepository(),
    private readonly productRepository: IProductRepository = new PrismaProductRepository(),
    private readonly supplierRepository: ISupplierRepository = new PrismaSupplierRepository(),
  ) {}

  async link(productId: string, supplierId: string) {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new Error("Produit introuvable");
    }

    const supplier = await this.supplierRepository.findById(supplierId);
    if (!supplier) {
      throw new Error("Fournisseur introuvable");
    }

    const alreadyLinked = await this.productSupplierRepository.isLinked(
      productId,
      supplierId,
    );
    if (alreadyLinked) {
      throw new Error("Ce produit est déjà lié à ce fournisseur");
    }

    await this.productSupplierRepository.linkProductToSupplier(
      productId,
      supplierId,
    );
    return { message: "Produit lié au fournisseur" };
  }

  async unlink(productId: string, supplierId: string) {
    await this.productSupplierRepository.unlinkProductFromSupplier(
      productId,
      supplierId,
    );
    return { message: "Lien supprimé" };
  }

  async findSuppliersByProduct(productId: string) {
    const supplierIds =
      await this.productSupplierRepository.findSupplierIdsByProductId(
        productId,
      );
    const suppliers = await Promise.all(
      supplierIds.map((id) => this.supplierRepository.findById(id)),
    );
    return { suppliers: suppliers.filter((s) => s !== null) };
  }

  async findProductsBySupplier(supplierId: string) {
    const productIds =
      await this.productSupplierRepository.findProductIdsBySupplierId(
        supplierId,
      );
    const products = await Promise.all(
      productIds.map((id) => this.productRepository.findById(id)),
    );
    return { products: products.filter((p) => p !== null) };
  }
}
