import { IOrderNotificationRepository } from "@/core/domain/repositories/IOrderNotificationRepository";

import { IOrderNotificationUseCase } from "./IOrderNotificationUseCase";
import {
  GetOrderNotificationsUseCaseRequestModel,
  GetOrderNotificationsUseCaseResponseModel,
} from "./model/orderNotification/GetOrderNotificationsUseCaseModel";

export class OrderNotificationUseCase implements IOrderNotificationUseCase {
  constructor(
    private orderNotificationRepository: IOrderNotificationRepository
  ) {}
  async getOrderNotifications({
    params,
  }: GetOrderNotificationsUseCaseRequestModel): Promise<GetOrderNotificationsUseCaseResponseModel> {
    const orderNotifications =
      await this.orderNotificationRepository.findMany(params);

    return { orderNotifications };
  }
}
