import { OrderProductItem } from "@/core/domain/entities/OrderProductItem";
import { IOrderProductItemRepository } from "@/core/domain/repositories/IOrderProductItemRepository";

export class InMemoryOrderProductItemRepository
  implements IOrderProductItemRepository
{
  public items: OrderProductItem[] = [];

  async findById(id: string): Promise<OrderProductItem | null> {
    const foundOrderProductItem = this.items.find(
      (orderProductItem) => orderProductItem.id.toString() === id
    );

    return foundOrderProductItem || null;
  }

  async deleteByProductId(id: string): Promise<void> {
    this.items = this.items.filter(
      (orderProductItem) => orderProductItem.productId.toString() !== id
    );
  }

  async findManyByComboId(comboId: string): Promise<OrderProductItem[]> {
    const foundOrderProductItems = this.items.filter(
      (orderProductItem) => orderProductItem.productId.toString() === comboId
    );

    return foundOrderProductItems;
  }

  async create(combo: OrderProductItem): Promise<OrderProductItem> {
    this.items.push(combo);

    return combo;
  }

  async createMany(orderProductItems: OrderProductItem[]): Promise<number> {
    this.items.push(...orderProductItems);

    return orderProductItems.length;
  }
}
