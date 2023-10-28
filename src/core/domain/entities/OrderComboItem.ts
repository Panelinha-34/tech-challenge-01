import { Entity } from "../base/entities/Entity";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";

export interface OrderComboItemProps {
  orderId: UniqueEntityId;
  comboId: UniqueEntityId;
  annotation?: string;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt?: Date;
}

export class OrderComboItem extends Entity<OrderComboItemProps> {
  constructor(
    props: Optional<OrderComboItemProps, "createdAt">,
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

  get comboId() {
    return this.props.comboId;
  }

  get annotation() {
    return this.props.annotation;
  }

  get quantity() {
    return this.props.quantity;
  }

  get totalPrice() {
    return this.props.totalPrice;
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
