import { Order } from "@/core/domain/entities/Order";

export interface CreateOrderUseCaseRequestModel {
  clientId: string;
  status: string;
  totalPrice: number;
}

export interface CreateOrderUseCaseResponseModel {
  order: Order;
}
