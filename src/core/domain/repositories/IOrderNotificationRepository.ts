import { PaginationParams } from "../base/PaginationParams";
import { PaginationResponse } from "../base/PaginationResponse";
import { OrderNotification } from "../entities/OrderNotification";

export interface IOrderNotificationRepository {
  findMany(
    params: PaginationParams
  ): Promise<PaginationResponse<OrderNotification>>;
  findById(id: string): Promise<OrderNotification | null>;
  create(orderNotification: OrderNotification): Promise<OrderNotification>;
  update(orderNotification: OrderNotification): Promise<OrderNotification>;
}
