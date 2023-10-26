import { OrderProductItem } from "../entities/OrderProductItem";

export interface IOrderProductItemRepository {
  findById(id: string): Promise<OrderProductItem | null>;

  findManyByProductId(productId: string): Promise<OrderProductItem[]>;

  create(orderProductItem: OrderProductItem): Promise<OrderProductItem>;

  createMany(orderProductItems: OrderProductItem[]): Promise<number>;

  deleteByProductId(productId: string): Promise<void>;
}
