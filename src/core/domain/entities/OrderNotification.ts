import { Entity } from "../base/entities/Entity";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";

export interface OrderNotificationProps {
  status: string;
  message: string;
  orderId: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class OrderNotification extends Entity<OrderNotificationProps> {
  constructor(
    props: Optional<OrderNotificationProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }

  get status() {
    return this.props.status;
  }

  get message() {
    return this.props.message;
  }

  get orderId() {
    return this.props.orderId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
