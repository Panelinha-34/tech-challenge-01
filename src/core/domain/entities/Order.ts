import { Entity } from "../base/entities/Entity";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";
import { OrderStatus } from "../valueObjects/OrderStatus";

export interface OrderProps {
  status: OrderStatus;
  totalPrice: number;
  clientId: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Order extends Entity<OrderProps> {
  constructor(props: Optional<OrderProps, "createdAt">, id?: UniqueEntityId) {
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

  set status(value: OrderStatus) {
    this.props.status = value;
    this.touch();
  }

  get totalPrice() {
    return this.props.totalPrice;
  }

  get clientId() {
    return this.props.clientId;
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
