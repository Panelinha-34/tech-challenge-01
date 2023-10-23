import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Combo } from '@/core/domain/entities/Combo';
import { IComboRepository } from '@/core/domain/repositories/IComboRepository';

export class InMemoryComboRepository implements IComboRepository {
  public items: Combo[] = [];

  async findById(id: string): Promise<Combo | null> {
    const combo = this.items.find((a) => a.id.toString() === id);

    return combo || null;
  }

  async findByName(name: string): Promise<Combo | null> {
    const combo = this.items.find((a) => a.name === name);

    return combo || null;
  }

  async findMany({ page, size }: PaginationParams): Promise<Combo[]> {
    const combos = this.items.slice((page - 1) * size, page * size);

    return combos;
  }

  async create(combo: Combo): Promise<Combo> {
    this.items.push(combo);

    return combo;
  }

  async update(combo: Combo): Promise<Combo> {
    const index = this.items.findIndex((a) => a.id === combo.id);

    this.items[index] = combo;

    return combo;
  }
}
