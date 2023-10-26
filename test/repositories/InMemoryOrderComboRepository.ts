import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { OrderComboItem } from "@/core/domain/entities/OrderComboItem";
import { IOrderComboItemRepository } from "@/core/domain/repositories/IOrderComboItemRepository";

export class InMemoryOrderComboItemRepository
  implements IOrderComboItemRepository
{
  public items: OrderComboItem[] = [];

  async findById(id: string): Promise<OrderComboItem | null> {
    const foundOrderComboItem = this.items.find(
      (orderComboItem) => orderComboItem.id.toString() === id
    );

    return foundOrderComboItem || null;
  }

  async deleteByComboId(id: string): Promise<void> {
    this.items = this.items.filter(
      (orderComboItem) => orderComboItem.comboId.toString() !== id
    );
  }

  async findMany({ page, size }: PaginationParams): Promise<OrderComboItem[]> {
    const combos = this.items.slice((page - 1) * size, page * size);

    return combos;
  }

  async findManyByComboId(comboId: string): Promise<OrderComboItem[]> {
    const foundOrderComboItems = this.items.filter(
      (orderComboItem) => orderComboItem.comboId.toString() === comboId
    );

    return foundOrderComboItems;
  }

  async create(combo: OrderComboItem): Promise<OrderComboItem> {
    this.items.push(combo);

    return combo;
  }

  async createMany(orderComboItems: OrderComboItem[]): Promise<number> {
    this.items.push(...orderComboItems);

    return orderComboItems.length;
  }
}
