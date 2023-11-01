import { AggregateRoot } from "../base/entities/AggregateRoot";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";
import { Taxvat } from "../valueObjects/Taxvat";

export interface ClientProps {
  name: string;
  email: string;
  taxVat: Taxvat;
  createdAt: Date;
  updatedAt?: Date;
}

export class Client extends AggregateRoot<ClientProps> {
  constructor(props: Optional<ClientProps, "createdAt">, id?: UniqueEntityId) {
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

  get email() {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
    this.touch();
  }

  get taxVat() {
    return this.props.taxVat;
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
