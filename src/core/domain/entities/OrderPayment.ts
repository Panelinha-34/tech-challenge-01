import { Entity } from "../base/entities/Entity";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";

export interface OrderPaymentProps {
  orderId: string;
  amount: number;
  payment_method: string;
  status: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class OrderPayment extends Entity<OrderPaymentProps> {
  constructor(
    props: Optional<OrderPaymentProps, "createdAt">,
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

  get amount() {
    return this.props.amount;
  }

  get payment_method() {
    return this.props.payment_method;
  }

  get status() {
    return this.props.status;
  }

  set status(value: string) {
    this.props.status = value;
    this.touch();
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
