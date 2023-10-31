/* eslint-disable import/no-cycle */

import { AggregateRoot } from "../base/entities/AggregateRoot";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";
import { UpdatedOrderStatusEvent } from "../events/UpdatedOrderStatusEvent";
import { OrderStatus } from "../valueObjects/OrderStatus";
import { PaymentMethod } from "../valueObjects/PaymentMethod";
import { OrderComboItemList } from "./OrderComboItemList";
import { OrderProductItemList } from "./OrderProductItemList";

export interface OrderProps {
  status: OrderStatus;
  totalPrice: number;
  createdAt: Date;
  clientId?: UniqueEntityId;
  visitorName?: string;
  updatedAt?: Date;
  paymentMethod: PaymentMethod;
  paymentDetails?: string;
  combos: OrderComboItemList;
  products: OrderProductItemList;
}

export class Order extends AggregateRoot<OrderProps> {
  constructor(
    props: Optional<OrderProps, "createdAt" | "combos" | "products">,
    id?: UniqueEntityId
  ) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        combos: props.combos ?? new OrderComboItemList(),
        products: props.products ?? new OrderProductItemList(),
      },
      id
    );

    const isNewAnswer = !id;

    if (isNewAnswer) {
      this.addDomainEvent(new UpdatedOrderStatusEvent(this));
    }
  }

  get status() {
    return this.props.status;
  }

  set status(value: OrderStatus) {
    this.props.status.name = value.name;

    this.addDomainEvent(new UpdatedOrderStatusEvent(this));

    this.touch();
  }

  get totalPrice() {
    return this.props.totalPrice;
  }

  get clientId() {
    return this.props.clientId;
  }

  get visitorName() {
    return this.props.visitorName;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get combos() {
    return this.props.combos;
  }

  set combos(value: OrderComboItemList) {
    this.props.combos = value;
    this.touch();
  }

  get products() {
    return this.props.products;
  }

  set products(value: OrderProductItemList) {
    this.props.products = value;
    this.touch();
  }

  get paymentMethod() {
    return this.props.paymentMethod;
  }

  get paymentDetails() {
    return this.props.paymentDetails;
  }

  set paymentDetails(value: string | undefined) {
    this.props.paymentDetails = value;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
