import { PaginationParams } from "../base/PaginationParams";
import { Order } from "../entities/Order";

export interface IOrderRepository {
  findMany(params: PaginationParams): Promise<Order[]>;
}
