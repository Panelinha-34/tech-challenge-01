import { PaginationParams } from "../base/PaginationParams";
import { Client } from "../entities/Client";

export interface IClientRepository {
  findMany(params: PaginationParams): Promise<Client[]>;

  findById(id: string): Promise<Client | null>;

  findByTaxVat(taxVat: string): Promise<Client | null>;

  findByEmail(email: string): Promise<Client | null>;

  create(client: Client): Promise<void>;
}
