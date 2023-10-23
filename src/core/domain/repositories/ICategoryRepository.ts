import { PaginationParams } from "../base/PaginationParams";
import { Category } from "../entities/Category";

export interface ICategoryRepository {
  findMany(params: PaginationParams): Promise<Category[]>;

  findById(id: string): Promise<Category | null>;

  findByName(name: string): Promise<Category | null>;

  create(category: Category): Promise<Category>;

  update(category: Category): Promise<Category>;
}
