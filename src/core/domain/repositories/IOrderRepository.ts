import { PaginationParams } from "../base/PaginationParams";
import { PaginationResponse } from "../base/PaginationResponse";
import { Order } from "../entities/Order";
import { OrderStatus } from "../valueObjects/OrderStatus";

export interface IOrderRepository {
  findMany(
    params: PaginationParams,
    status?: OrderStatus,
    clientId?: string
  ): Promise<PaginationResponse<Order>>;

  findManyQueueFormated(
    params: PaginationParams
  ): Promise<PaginationResponse<Order>>;

  findManyByClientId(
    params: PaginationParams,
    clientId: string
  ): Promise<PaginationResponse<Order>>;

  findById(id: string): Promise<Order | null>;

  create(order: Order): Promise<Order>;

  update(order: Order): Promise<Order>;
}
