import { Client } from "@/core/domain/entities/Client";

export interface CreateClientUseCaseRequestModel {
  name: string;
  email: string;
  taxVat: string;
}

export interface CreateClientUseCaseResponseModel {
  client: Client;
}
