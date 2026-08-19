import pool from "../../lib/pg.lib";
import { Product } from "../models/product.model";

export interface CreateNewProductData {
  reference: number;
  name: string;
  describe?: string | null;
  code_barre: string;
  unite: string;
  stock_minimum: number;
  actif: boolean;
}

export interface UpdateNewProductData {
  reference?: number;
  name?: string;
  describe?: string | null;
  code_barre?: string;
  unite?: string;
  stock_minimum?: number;
  actif?: boolean;
}

export interface IProductRepository {
  find(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(data: CreateNewProductData): Promise<Product>;
  //   update(id: string, data: UpdateNewProductData): Promise<Product>;
  delete(id: string): Promise<void>;
}

export class ProductSqlRepository implements IProductRepository {
  async find(): Promise<Product[]> {
    const result = await pool.query<Product>(`
      SELECT id, reference, name, describe, code_barre, unite, stock_minimum, actif
      FROM "Product"
    `);
    console.log("prodSql.repository - find ~ result:  ", result);
    return result.rows.map((row) => Product.create({ ...row }));
  }

  async findById(id: string): Promise<Product | null> {
    const result = await pool.query<Product>(
      `SELECT id, reference, name, describe, code_barre, unite, stock_minimum, actif
       FROM "Product"
       WHERE id = $1
       LIMIT 1`,
      [id],
    );
    console.log("prodSql.repository - find ~ result:  ", result);
    return Product.create({ ...result.rows[0] });
  }

  async create(data: CreateNewProductData): Promise<Product> {
    const result = await pool.query<Product>(
      `INSERT INTO "Product" (reference, name, describe, code_barre, unite, stock_minimum, actif)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, reference, name, describe, code_barre, unite, stock_minimum, actif`,
      [
        data.reference,
        data.name,
        data.describe ?? null,
        data.code_barre,
        data.unite,
        data.stock_minimum,
        data.actif,
      ],
    );
    return Product.create({ ...result.rows[0] });
  }

  //   async update(id: string, data: UpdateNewProductData): Promise<Product> {

  //   }

  async delete(id: string): Promise<void> {
    await pool.query(`DELETE FROM "Product" WHERE id = $1`, [id]);
  }
}
