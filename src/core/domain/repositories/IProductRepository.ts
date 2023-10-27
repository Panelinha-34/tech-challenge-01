import { PaginationParams } from "../base/PaginationParams";
import { PaginationResponse } from "../base/PaginationResponse";
import { Product } from "../entities/Product";
import { Category } from "../valueObjects/Category";

export interface IProductRepository {
  findMany(
    params: PaginationParams,
    category?: Category
  ): Promise<PaginationResponse<Product>>;

  findById(id: string): Promise<Product | null>;

  findByIdAndCategory(id: string, category: Category): Promise<Product | null>;

  findManyByIds(ids: string[]): Promise<Product[]>;

  findByName(email: string): Promise<Product | null>;

  create(product: Product): Promise<Product>;

  update(product: Product): Promise<Product>;

  delete(id: string): Promise<void>;
}
