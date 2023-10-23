import { PaginationParams } from "../base/PaginationParams";
import { OrderNotification } from "../entities/OrderNotification";

export interface IOrderNotificationRepository {
  findMany(params: PaginationParams): Promise<OrderNotification[]>;
}
