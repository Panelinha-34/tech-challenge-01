import { Entity } from "../base/entities/Entity";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";
import { NotificationStatus } from "../valueObjects/NotificationStatus";

export interface OrderNotificationProps {
  orderId: UniqueEntityId;
  clientId: UniqueEntityId;
  status: NotificationStatus;
  message: string;
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

  get orderId() {
    return this.props.orderId;
  }

  get clientId() {
    return this.props.clientId;
  }

  get message() {
    return this.props.message;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get status() {
    return this.props.status;
  }

  set status(value: NotificationStatus) {
    this.props.status.name = value.name;

    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
