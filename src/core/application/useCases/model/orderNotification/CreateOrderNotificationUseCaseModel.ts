import { OrderNotification } from "@/core/domain/entities/OrderNotification";

export interface CreateOrderNotificationUseCaseRequestModel {
  clientId: string;
  orderId: string;
  message: string;
}

export interface CreateOrderNotificationUseCaseResponseModel {
  orderNotification: OrderNotification;
}
