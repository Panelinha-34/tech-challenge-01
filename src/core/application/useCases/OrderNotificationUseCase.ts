import { OrderNotificationRepository } from "@/core/domain/repositories/OrderNotificationRepository";

import { IOrderNotificationUseCase } from "./IOrderNotificationUseCase";
import {
  GetOrderNotificationsUseCaseRequestModel,
  GetOrderNotificationsUseCaseResponseModel,
} from "./model/orderNotification/GetOrderNotificationsUseCaseModel";

export class OrderNotificationUseCase implements IOrderNotificationUseCase {
  constructor(
    private orderNotificationRepository: OrderNotificationRepository
  ) {}
  async getOrderNotifications({
    params,
  }: GetOrderNotificationsUseCaseRequestModel): Promise<GetOrderNotificationsUseCaseResponseModel> {
    const orderNotifications =
      await this.orderNotificationRepository.findMany(params);

    return { orderNotifications };
  }
}
