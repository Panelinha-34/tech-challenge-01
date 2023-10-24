import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { ComboProduct } from "@/core/domain/entities/ComboProduct";
import { IComboProductRepository } from "@/core/domain/repositories/IComboProductRepository";

export class InMemoryComboProductRepository implements IComboProductRepository {
  async findById(id: string): Promise<ComboProduct | null> {
    const foundComboProduct = this.items.find(
      (comboProduct) => comboProduct.id.toString() === id
    );

    return foundComboProduct || null;
  }

  public items: ComboProduct[] = [];

  async findByProductIdAndComboId(
    productId: string,
    comboId: string
  ): Promise<ComboProduct | null> {
    const foundComboProduct = this.items.find(
      (comboProduct) =>
        comboProduct.productId.toString() === productId &&
        comboProduct.comboId.toString() === comboId
    );

    return foundComboProduct || null;
  }

  async deleteByComboId(id: string): Promise<void> {
    this.items = this.items.filter(
      (comboProduct) => comboProduct.comboId.toString() !== id
    );
  }

  async findMany({ page, size }: PaginationParams): Promise<ComboProduct[]> {
    const combos = this.items.slice((page - 1) * size, page * size);

    return combos;
  }

  async findManyByComboID(comboId: string): Promise<ComboProduct[]> {
    const foundComboProducts = this.items.filter(
      (comboProduct) => comboProduct.comboId.toString() === comboId
    );

    return foundComboProducts;
  }

  async create(combo: ComboProduct): Promise<ComboProduct> {
    this.items.push(combo);

    return combo;
  }

  async createMany(comboProducts: ComboProduct[]): Promise<number> {
    this.items.push(...comboProducts);

    return comboProducts.length;
  }
}
