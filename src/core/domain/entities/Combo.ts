import { Entity } from "../base/entities/Entity";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";

export interface ComboProps {
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt?: Date;
}

export class Combo extends Entity<ComboProps> {
  constructor(
    props: Optional<ComboProps, "createdAt" | "name" | "description">,
    id?: UniqueEntityId
  ) {
    super(
      {
        ...props,
        name: props.name ?? `Combo ${new Date().getTime()}`,
        description: props.name ?? `Combo ${new Date().getTime()}`,
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
