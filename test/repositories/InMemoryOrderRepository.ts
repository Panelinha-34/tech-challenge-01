import { DomainEvents } from "@/core/domain/base/events/DomainEvents";
import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Order } from "@/core/domain/entities/Order";
import { OrderStatusEnum } from "@/core/domain/enum/OrderStatusEnum";
import { IOrderComboItemRepository } from "@/core/domain/repositories/IOrderComboItemRepository";
import { IOrderRepository } from "@/core/domain/repositories/IOrderRepository";
import { OrderStatus } from "@/core/domain/valueObjects/OrderStatus";

export class InMemoryOrderRepository implements IOrderRepository {
  public items: Order[] = [];

  constructor(private orderComboItemRepository: IOrderComboItemRepository) {}

  async findManyQueueFormated({
    page,
    size,
  }: PaginationParams): Promise<PaginationResponse<Order>> {
    const filteredItems = this.items.filter(
      (p) =>
        p.status.name === OrderStatusEnum.IN_PREPARATION ||
        p.status.name === OrderStatusEnum.READY
    );

    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / size);

    const data = filteredItems.slice((page - 1) * size, page * size);

    return new PaginationResponse<Order>({
      data,
      totalItems,
      currentPage: page,
      pageSize: size,
      totalPages,
    });
  }

  async findMany(
    { page, size }: PaginationParams,
    status?: OrderStatus,
    clientId?: string
  ): Promise<PaginationResponse<Order>> {
    const filteredItems = this.items.filter(
      (p) =>
        (status ? p.status === status : true) &&
        (clientId ? p.clientId?.toString() === clientId : true)
    );

    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / size);

    const data = filteredItems.slice((page - 1) * size, page * size);

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
      (order) => order.clientId?.toString() === clientId
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

  async create(order: Order): Promise<Order> {
    this.items.push(order);

    this.orderComboItemRepository.createMany(order.combos.getItems());

    DomainEvents.dispatchEventsForAggregate(order.id);

    return order;
  }

  async update(order: Order): Promise<Order> {
    const index = this.items.findIndex((a) => a.id === order.id);

    if (index === -1) {
      throw new Error("Order not found");
    }

    this.items[index] = order;

    DomainEvents.dispatchEventsForAggregate(order.id);

    return order;
  }
}
