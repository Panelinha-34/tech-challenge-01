import { PaginationParams } from "../base/PaginationParams";
import { ComboProduct } from "../entities/ComboProduct";

export interface IComboProductRepository {
  findById(id: string): Promise<ComboProduct | null>;

  findMany(params: PaginationParams): Promise<ComboProduct[]>;

  findByProductIdAndComboId(
    productId: string, comboId: string
  ): Promise<ComboProduct | null>;

  create(comboProduct: ComboProduct): Promise<ComboProduct>;

  delete(id: string): Promise<void>;
}
