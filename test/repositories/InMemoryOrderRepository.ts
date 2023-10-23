import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Order } from "@/core/domain/entities/Order";
import { OrderRepository } from "@/core/domain/repositories/OrderRepository";

export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = [];

  async findMany({ page, size }: PaginationParams): Promise<Order[]> {
    const answers = this.items.slice((page - 1) * size, page * size);

    return answers;
  }
}
