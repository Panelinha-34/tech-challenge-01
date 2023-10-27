import { OrderProductItem } from "../entities/OrderProductItem";

export interface IOrderProductItemRepository {
  findById(id: string): Promise<OrderProductItem | null>;

  findManyByOrderId(orderId: string): Promise<OrderProductItem[]>;

  create(orderProductItem: OrderProductItem): Promise<OrderProductItem>;

  createMany(orderProductItems: OrderProductItem[]): Promise<number>;

  deleteByProductId(productId: string): Promise<void>;
}
