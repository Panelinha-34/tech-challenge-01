import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { OrderNotification } from "@/core/domain/entities/OrderNotification";

export interface GetOrderNotificationsUseCaseRequestModel {
  params: PaginationParams;
}

export interface GetOrderNotificationsUseCaseResponseModel {
  paginationResponse: PaginationResponse<OrderNotification>;
}
