import { Entity } from "../base/entities/Entity";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { EntityPropValidationError } from "../base/error/EntityPropValidationError";
import { Optional } from "../base/types/Optional";
import { Category } from "../valueObjects/Category";

export interface ProductProps {
  name: string;
  description: string;
  price: number;
  active: boolean;
  category: Category;
  createdAt: Date;
  updatedAt?: Date;
}

export class Product extends Entity<ProductProps> {
  constructor(
    props: Optional<ProductProps, "createdAt" | "active">,
    id?: UniqueEntityId
  ) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        active: props.active ?? true,
      },
      id
    );

    this.validate();
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

  get active() {
    return this.props.active;
  }

  set active(value: boolean) {
    this.props.active = value;
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

  validate() {
    if (this.props.name.length < 3) {
      throw new EntityPropValidationError<Product>(
        "name",
        "must be at least 3 characters long"
      );
    }
    if (this.props.description.length < 3) {
      throw new EntityPropValidationError<Product>(
        "description",
        "must be at least 3 characters long"
      );
    }
    if (this.props.price <= 0) {
      throw new EntityPropValidationError<Product>(
        "price",
        "must be greater than 0"
      );
    }
  }
}
