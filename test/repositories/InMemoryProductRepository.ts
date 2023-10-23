import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Product } from "@/core/domain/entities/Product";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";

export class InMemoryProductRepository implements IProductRepository {
  public items: Product[] = [];

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((a) => a.id.toString() === id);

    return product || null;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = this.items.find((a) => a.name === name);

    return product|| null;
  }

  async findMany({ page, size }: PaginationParams): Promise<Product[]> {
    const products = this.items.slice((page - 1) * size, page * size);

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
