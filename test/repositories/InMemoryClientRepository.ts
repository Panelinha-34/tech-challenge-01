import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Client } from "@/core/domain/entities/Client";
import { ClientRepository } from "@/core/domain/repositories/ClientRepository";

export class InMemoryClientRepository implements ClientRepository {
  public items: Client[] = [];

  async findMany({ page, size }: PaginationParams): Promise<Client[]> {
    const answers = this.items.slice((page - 1) * size, page * size);

    return answers;
  }
}
