import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Client } from "@/core/domain/entities/Client";

export interface GetClientsUseCaseRequestModel {
  params: PaginationParams;
}

export interface GetClientsUseCaseResponseModel {
  paginationResponse: PaginationResponse<Client>;
}
