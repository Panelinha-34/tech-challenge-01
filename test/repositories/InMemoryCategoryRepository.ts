import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Category } from "@/core/domain/entities/Category";
import { ICategoryRepository } from "@/core/domain/repositories/ICategoryRepository";

export class InMemoryCategoryRepository implements ICategoryRepository {
  public items: Category[] = [];

  async findById(id: string): Promise<Category | null> {
    const category = this.items.find((a) => a.id.toString() === id);

    return category || null;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.items.find((a) => a.name === name);

    return category || null;
  }

  async findMany({ page, size }: PaginationParams): Promise<Category[]> {
    const category = this.items.slice((page - 1) * size, page * size);

    return category;
  }

  async create(category: Category): Promise<Category> {
    this.items.push(category);

    return category;
  }

  async update(category: Category): Promise<Category> {
    const index = this.items.findIndex((a) => a.id === category.id);

    this.items[index] = category;

    return category;
  }
}
