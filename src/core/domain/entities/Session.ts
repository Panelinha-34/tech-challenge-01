import { Entity } from "../base/entities/Entity";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";
import { Client } from "./Client";

export interface SessionProps {
  client: Client;
  createdAt: Date;
}

export class Session extends Entity<SessionProps> {
  constructor(props: Optional<SessionProps, "createdAt">, id?: UniqueEntityId) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }

  get client() {
    return this.props.client;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
