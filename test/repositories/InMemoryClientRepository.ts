import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Client } from "@/core/domain/entities/Client";
import { IClientRepository } from "@/core/domain/repositories/IClientRepository";

export class InMemoryClientRepository implements IClientRepository {
  public items: Client[] = [];

  async findById(id: string): Promise<Client | null> {
    const answer = this.items.find((a) => a.id.toString() === id);

    return answer || null;
  }

  async findByTaxVat(taxVat: string): Promise<Client | null> {
    const answer = this.items.find((a) => a.taxVat.number === taxVat);

    return answer || null;
  }

  async findByEmail(email: string): Promise<Client | null> {
    const answer = this.items.find((a) => a.email === email);

    return answer || null;
  }

  async findMany({ page, size }: PaginationParams): Promise<Client[]> {
    const answers = this.items.slice((page - 1) * size, page * size);

    return answers;
  }

  async create(client: Client): Promise<Client> {
    this.items.push(client);

    return client;
  }

  async update(client: Client): Promise<Client> {
    const index = this.items.findIndex((a) => a.id === client.id);

    this.items[index] = client;

    return client;
  }
}
