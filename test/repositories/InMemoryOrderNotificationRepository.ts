import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { OrderNotification } from "@/core/domain/entities/OrderNotification";
import { IOrderNotificationRepository } from "@/core/domain/repositories/IOrderNotificationRepository";

export class InMemoryOrderNotificationRepository
  implements IOrderNotificationRepository
{
  public items: OrderNotification[] = [];

  async findMany({
    page,
    size,
  }: PaginationParams): Promise<PaginationResponse<OrderNotification>> {
    const totalItems = this.items.length;
    const totalPages = Math.ceil(totalItems / size);

    const data = this.items.slice((page - 1) * size, page * size);

    return new PaginationResponse<OrderNotification>({
      data,
      totalItems,
      currentPage: page,
      pageSize: size,
      totalPages,
    });
  }

  async create(
    orderNotification: OrderNotification
  ): Promise<OrderNotification> {
    this.items.push(orderNotification);
    return orderNotification;
  }

  async findById(id: string): Promise<OrderNotification | null> {
    const orderNotification = this.items.find(
      (notification) => notification.id.toString() === id
    );

    return orderNotification || null;
  }

  async update(
    orderNotification: OrderNotification
  ): Promise<OrderNotification> {
    const index = this.items.findIndex(
      (notification) =>
        notification.id.toString() === orderNotification.id.toString()
    );

    this.items[index] = orderNotification;

    return orderNotification;
  }
}
