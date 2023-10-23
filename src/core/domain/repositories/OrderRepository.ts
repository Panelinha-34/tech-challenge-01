import { PaginationParams } from "../base/PaginationParams";
import { Order } from "../entities/Order";

export interface OrderRepository {
  findMany(params: PaginationParams): Promise<Order[]>;
}
