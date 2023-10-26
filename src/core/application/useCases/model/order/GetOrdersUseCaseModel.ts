import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Order } from "@/core/domain/entities/Order";

export interface GetOrdersUseCaseRequestModel {
  params: PaginationParams;
}

export interface GetOrdersUseCaseResponseModel {
  paginationResponse: PaginationResponse<Order>;
}
