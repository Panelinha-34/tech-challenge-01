import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Order } from "@/core/domain/entities/Order";

export interface GetOrdersUseCaseRequestModel {
  params: PaginationParams;
}

export interface GetOrdersUseCaseResponseModel {
  orders: Order[];
}
