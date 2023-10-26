import { PaginationParams } from "../base/PaginationParams";
import { Combo } from "../entities/Combo";

export interface IComboRepository {
  findMany(params: PaginationParams): Promise<Combo[]>;

  findById(id: string): Promise<Combo | null>;

  findByName(name: string): Promise<Combo | null>;

  create(combo: Combo): Promise<Combo>;

  update(combo: Combo): Promise<Combo>;

  delete(id: string): Promise<void>;
}
