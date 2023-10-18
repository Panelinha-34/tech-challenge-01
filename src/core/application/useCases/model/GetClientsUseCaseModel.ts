import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Client } from "@/core/domain/entities/Client";

export interface GetClientsUseCaseProps {
  params: PaginationParams;
}

export interface GetClientsUseCaseResponse {
  clients: Client[];
}
