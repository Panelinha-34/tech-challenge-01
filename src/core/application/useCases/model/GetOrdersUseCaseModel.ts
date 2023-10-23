import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Order } from "@/core/domain/entities/Order";

export interface GetOrdersUseCaseProps {
  params: PaginationParams;
}

export interface GetOrdersUseCaseResponse {
  orders: Order[];
}
