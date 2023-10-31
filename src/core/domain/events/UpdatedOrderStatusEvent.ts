/* eslint-disable import/no-cycle */
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { DomainEvent } from "../base/events/DomainEvent";
import { Order } from "../entities/Order";

export class UpdatedOrderStatusEvent implements DomainEvent {
  public ocurredAt: Date;

  public order: Order;

  constructor(order: Order) {
    this.order = order;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.order.id;
  }
}
