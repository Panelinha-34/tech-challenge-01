import { PaginationParams } from "../base/PaginationParams";
import { Product } from "../entities/Product";
import { Category } from "../valueObjects/Category";

export interface IProductRepository {
  findMany(params: PaginationParams): Promise<Product[]>;

  findManyByCategory(category: Category): Promise<Product[]>;

  findById(id: string): Promise<Product | null>;

  findByIdAndCategory(id: string, category: Category): Promise<Product | null>;

  findManyByIds(ids: string[]): Promise<Product[]>;

  findByName(email: string): Promise<Product | null>;

  create(product: Product): Promise<Product>;

  update(product: Product): Promise<Product>;

  delete(id: string): Promise<void>;
}
