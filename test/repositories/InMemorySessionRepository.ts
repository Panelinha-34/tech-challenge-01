import { Session } from "@/core/domain/entities/Session";
import { ISessionRepository } from "@/core/domain/repositories/ISessionRepository";

export class InMemorySessionRepository implements ISessionRepository {
  public items: Session[] = [];

  async create(order: Session): Promise<Session> {
    this.items.push(order);

    return order;
  }
}
