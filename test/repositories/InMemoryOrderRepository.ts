import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Order } from "@/core/domain/entities/Order";
import { IOrderRepository } from "@/core/domain/repositories/IOrderRepository";

export class InMemoryOrderRepository implements IOrderRepository {
  public items: Order[] = [];

  async findMany({
    page,
    size,
  }: PaginationParams): Promise<PaginationResponse<Order>> {
    const totalItems = this.items.length;
    const totalPages = Math.ceil(totalItems / size);

    const data = this.items.slice((page - 1) * size, page * size);

    return new PaginationResponse<Order>({
      data,
      totalItems,
      currentPage: page,
      pageSize: size,
      totalPages,
    });
  }

  async findManyByClientId(
    params: PaginationParams,
    clientId: string
  ): Promise<PaginationResponse<Order>> {
    const filteredItems = this.items.filter(
      (order) => order.clientId === clientId
    );

    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / params.size);

    const data = filteredItems.slice(
      (params.page - 1) * params.size,
      params.page * params.size
    );

    return new PaginationResponse<Order>({
      data,
      totalItems,
      currentPage: params.page,
      pageSize: params.size,
      totalPages,
    });
  }

  async findById(id: string): Promise<Order | null> {
    const answer = this.items.find((a) => a.id.toString() === id);

    return answer || null;
  }

  async update(order: Order): Promise<Order> {
    const index = this.items.findIndex((a) => a.id === order.id);

    this.items[index] = order;

    return order;
  }

  async create(order: Order): Promise<Order> {
    this.items.push(order);

    return order;
  }
}
