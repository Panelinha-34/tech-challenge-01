import { Entity } from "../base/entities/Entity";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";

export interface ComboProductProps {
  productId: string;
  comboId: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class ComboProduct extends Entity<ComboProductProps> {
  constructor(props: Optional<ComboProductProps, "createdAt">, id?: UniqueEntityId) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }

  get comboId() {
    return this.props.comboId;
  }

  set comboId(value: string) {
    this.props.comboId = value;
    this.touch();
  }

  get productId() {
    return this.props.productId;
  }

  set productId(value: string) {
    this.props.productId = value;
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
