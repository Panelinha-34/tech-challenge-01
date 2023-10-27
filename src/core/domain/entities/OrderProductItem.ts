import { Entity } from "../base/entities/Entity";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";

export interface OrderProductItemProps {
  orderId: UniqueEntityId;
  productId: UniqueEntityId;
  annotation?: string;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt?: Date;
}

export class OrderProductItem extends Entity<OrderProductItemProps> {
  constructor(
    props: Optional<OrderProductItemProps, "createdAt">,
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

  get productId() {
    return this.props.productId;
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
