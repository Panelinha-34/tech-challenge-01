import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { OrderNotification } from "@/core/domain/entities/OrderNotification";
import { IOrderNotificationRepository } from "@/core/domain/repositories/IOrderNotificationRepository";

export class InMemoryOrderNotificationRepository
  implements IOrderNotificationRepository
{
  public items: OrderNotification[] = [];

  async findMany({
    page,
    size,
  }: PaginationParams): Promise<OrderNotification[]> {
    const answers = this.items.slice((page - 1) * size, page * size);

    return answers;
  }
}
