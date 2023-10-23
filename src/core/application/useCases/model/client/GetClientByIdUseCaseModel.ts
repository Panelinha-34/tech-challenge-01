import { Client } from "@/core/domain/entities/Client";

export interface GetClientByIdUseCaseRequestModel {
  id: string;
}

export interface GetClientByIdUseCaseResponseModel {
  client: Client;
}
