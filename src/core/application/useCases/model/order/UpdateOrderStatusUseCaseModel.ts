import { Order } from "@/core/domain/entities/Order";

export interface UpdateOrderStatusUseCaseRequestModel {
  id: string;
  status: string;
}

export interface UpdateOrderStatusUseCaseResponseModel {
  order: Order;
}
