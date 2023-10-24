import { Entity } from "../base/entities/Entity";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";
import { Category } from "../valueObjects/Category";

export interface ProductProps {
  name: string;
  description: string;
  price: number;
  category: Category;
  createdAt: Date;
  updatedAt?: Date;
}

export class Product extends Entity<ProductProps> {
  constructor(props: Optional<ProductProps, "createdAt">, id?: UniqueEntityId) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
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

  get category() {
    return this.props.category;
  }

  set category(value: Category) {
    this.props.category = value;
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
