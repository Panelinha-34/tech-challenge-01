import { OrderComboItem } from "../entities/OrderComboItem";

export interface IOrderComboItemRepository {
  findById(id: string): Promise<OrderComboItem | null>;

  findManyByComboId(comboId: string): Promise<OrderComboItem[]>;

  create(orderComboItem: OrderComboItem): Promise<OrderComboItem>;

  createMany(orderComboItems: OrderComboItem[]): Promise<number>;

  deleteByComboId(id: string): Promise<void>;
}
