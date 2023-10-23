import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Order } from "@/core/domain/entities/Order";
import { IOrderRepository } from "@/core/domain/repositories/IOrderRepository";

export class InMemoryOrderRepository implements IOrderRepository {
  public items: Order[] = [];

  async findMany({ page, size }: PaginationParams): Promise<Order[]> {
    const answers = this.items.slice((page - 1) * size, page * size);

    return answers;
  }

  async create(order: Order): Promise<Order> {
    this.items.push(order);

    return order;
  }
}
