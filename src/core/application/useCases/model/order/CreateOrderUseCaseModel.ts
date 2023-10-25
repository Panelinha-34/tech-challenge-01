import { Order } from "@/core/domain/entities/Order";
import { OrderStatus } from "@/core/domain/valueObjects/OrderStatus";



export interface CreateOrderUseCaseRequestModel {
  clientId: string;
  status: string;
  totalPrice: number;
}

export interface CreateOrderUseCaseResponseModel {
  order: Order;
}
