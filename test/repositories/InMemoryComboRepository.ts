import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Combo } from "@/core/domain/entities/Combo";
import { ComboProductList } from "@/core/domain/entities/ComboProductList";
import { IComboProductRepository } from "@/core/domain/repositories/IComboProductRepository";
import { IComboRepository } from "@/core/domain/repositories/IComboRepository";

export class InMemoryComboRepository implements IComboRepository {
  public items: Combo[] = [];

  constructor(private comboProductRepository: IComboProductRepository) {}

  async findById(id: string): Promise<Combo | null> {
    const combo = this.items.find((a) => a.id.toString() === id);

    if (!combo) {
      return null;
    }

    const products = await this.comboProductRepository
      .findManyByComboID(id)
      .then((p) => new ComboProductList(p));

    combo.products = products;

    return combo;
  }

  async findManyByIds(ids: string[]): Promise<Combo[]> {
    const combos = this.items.filter((a) => ids.includes(a.id.toString()));

    return combos;
  }

  async findMany({
    page,
    size,
  }: PaginationParams): Promise<PaginationResponse<Combo>> {
    const totalItems = this.items.length;
    const totalPages = Math.ceil(totalItems / size);

    const data = this.items.slice((page - 1) * size, page * size);

    return new PaginationResponse<Combo>({
      data,
      totalItems,
      currentPage: page,
      pageSize: size,
      totalPages,
    });
  }

  async create(combo: Combo): Promise<Combo> {
    this.items.push(combo);

    await this.comboProductRepository.createMany(combo.products.getItems());

    return combo;
  }

  async update(combo: Combo): Promise<Combo> {
    const index = this.items.findIndex((a) => a.id === combo.id);

    this.items[index] = combo;

    const productsToAdd = combo.products.getNewItems();

    if (productsToAdd.length) {
      this.comboProductRepository.createMany(productsToAdd);
    }

    const productsToRemove = combo.products.getRemovedItems();

    if (productsToRemove.length) {
      this.comboProductRepository.deleteMany(productsToRemove);
    }

    return combo;
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((a) => a.id.toString() !== id);

    this.comboProductRepository.deleteByComboId(id);
  }
}
