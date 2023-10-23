import { Client } from "@/core/domain/entities/Client";

export interface EditClientUseCaseRequestModel {
  id: string;
  name?: string;
  email?: string;
}

export interface EditClientUseCaseResponseModel {
  client: Client;
}
