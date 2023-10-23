import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { OrderNotification } from "@/core/domain/entities/OrderNotification";

export interface GetOrderNotificationsUseCaseProps {
  params: PaginationParams;
}

export interface GetOrderNotificationsUseCaseResponse {
  orderNotifications: OrderNotification[];
}
