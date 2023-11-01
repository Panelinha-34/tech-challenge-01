import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Order } from "@/core/domain/entities/Order";

export interface GetOrdersQueueFormatedUseCaseRequestModel {
  params: PaginationParams;
}

export interface GetOrdersQueueFormatedUseCaseResponseModel {
  paginationResponse: PaginationResponse<Order>;
}
