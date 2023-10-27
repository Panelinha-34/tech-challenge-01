import { Entity } from "../base/entities/Entity";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";
import { OrderStatus } from "../valueObjects/OrderStatus";
import { OrderComboItemList } from "./OrderComboItemList";
import { OrderProductItemList } from "./OrderProductItemList";

export interface OrderProps {
  status: OrderStatus;
  totalPrice: number;
  createdAt: Date;
  clientName?: string;
  clientId?: UniqueEntityId;
  updatedAt?: Date;
  combos: OrderComboItemList;
  products: OrderProductItemList;
}

export class Order extends Entity<OrderProps> {
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

  private touch() {
    this.props.updatedAt = new Date();
  }
}
