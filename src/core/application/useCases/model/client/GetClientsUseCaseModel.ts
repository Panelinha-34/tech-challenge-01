import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Client } from "@/core/domain/entities/Client";

export interface GetClientsUseCaseRequestModel {
  params: PaginationParams;
}

export interface GetClientsUseCaseResponseModel {
  clients: Client[];
}
