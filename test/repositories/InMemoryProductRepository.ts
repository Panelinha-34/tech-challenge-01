import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Product } from "@/core/domain/entities/Product";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { Category } from "@/core/domain/valueObjects/Category";

export class InMemoryProductRepository implements IProductRepository {
  public items: Product[] = [];

  async findMany(
    { page, size }: PaginationParams,
    includeInactive: boolean,
    category?: Category
  ): Promise<PaginationResponse<Product>> {
    const filteredItems = this.items.filter((p) =>
      category
        ? p.category === category
        : true && (includeInactive ? true : p.active)
    );

    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / size);

    const data = filteredItems.slice((page - 1) * size, page * size);

    return new PaginationResponse<Product>({
      data,
      totalItems,
      currentPage: page,
      pageSize: size,
      totalPages,
    });
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((a) => a.id.toString() === id);

    return product || null;
  }

  async findByIdAndCategory(
    id: string,
    category: Category
  ): Promise<Product | null> {
    const product = this.items.find(
      (a) => a.id.toString() === id && a.category.name === category.name
    );

    return product || null;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = this.items.find((a) => a.name === name);

    return product || null;
  }

  async findManyByIds(ids: string[]): Promise<Product[]> {
    const products = this.items.filter((a) => ids.includes(a.id.toString()));

    return products;
  }

  async create(product: Product): Promise<Product> {
    this.items.push(product);

    return product;
  }

  async update(product: Product): Promise<Product> {
    const index = this.items.findIndex((a) => a.id === product.id);

    this.items[index] = product;

    return product;
  }
}
