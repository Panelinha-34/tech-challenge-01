import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { OrderNotification } from "@/core/domain/entities/OrderNotification";

export interface GetOrderNotificationsUseCaseRequestModel {
  params: PaginationParams;
}

export interface GetOrderNotificationsUseCaseResponseModel {
  orderNotifications: OrderNotification[];
}
