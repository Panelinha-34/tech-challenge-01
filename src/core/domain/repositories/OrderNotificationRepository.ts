import { PaginationParams } from "../base/PaginationParams";
import { OrderNotification } from "../entities/OrderNotification";

export interface OrderNotificationRepository {
  findMany(params: PaginationParams): Promise<OrderNotification[]>;
}
