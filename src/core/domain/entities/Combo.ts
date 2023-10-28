import { AggregateRoot } from "../base/entities/AggregateRoot";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";
import { ComboProductList } from "./ComboProductList";

export interface ComboProps {
  name: string;
  description: string;
  price: number;
  products: ComboProductList;
  createdAt: Date;
  updatedAt?: Date;
}

export class Combo extends AggregateRoot<ComboProps> {
  constructor(
    props: Optional<
      ComboProps,
      "createdAt" | "name" | "description" | "products"
    >,
    id?: UniqueEntityId
  ) {
    super(
      {
        ...props,
        name: props.name ?? `Combo ${new Date().getTime()}`,
        description: props.name ?? `Combo ${new Date().getTime()}`,
        createdAt: props.createdAt ?? new Date(),
        products: props.products ?? new ComboProductList(),
      },
      id
    );
  }

  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
    this.touch();
  }

  get description() {
    return this.props.description;
  }

  set description(value: string) {
    this.props.description = value;
    this.touch();
  }

  get price() {
    return this.props.price;
  }

  set price(value: number) {
    this.props.price = value;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get products() {
    return this.props.products;
  }

  set products(value: ComboProductList) {
    this.props.products = value;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
