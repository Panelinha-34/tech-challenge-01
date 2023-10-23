import { PaginationParams } from "../base/PaginationParams";
import { Product } from "../entities/Product";

export interface IProductRepository {
  findMany(params: PaginationParams): Promise<Product[]>;

  findById(id: string): Promise<Product | null>;

  findByName(email: string): Promise<Product | null>;

  create(product: Product): Promise<Product>;

  update(product: Product): Promise<Product>;
}
