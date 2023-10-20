import { PaginationParams } from "../base/PaginationParams";
import { Client } from "../entities/Client";

export interface ClientRepository {
  findMany(params: PaginationParams): Promise<Client[]>;

  create(client: Client): Promise<void>;
}
