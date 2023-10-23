import { OrderNotificationRepository } from "@/core/domain/repositories/OrderNotificationRepository";

import { IOrderNotificationUseCase } from "./IOrderNotificationUseCase";
import {
  GetOrderNotificationsUseCaseProps,
  GetOrderNotificationsUseCaseResponse,
} from "./model/GetOrderNotificationsUseCaseModel";

export class OrderNotificationUseCase implements IOrderNotificationUseCase {
  constructor(
    private orderNotificationRepository: OrderNotificationRepository
  ) {}
  getClients(
    props: GetOrderNotificationsUseCaseProps
  ): Promise<GetOrderNotificationsUseCaseResponse> {
    throw new Error("Method not implemented.");
  }
  async getOrderNotifications({
    params,
  }: GetOrderNotificationsUseCaseProps): Promise<GetOrderNotificationsUseCaseResponse> {
    const orderNotifications =
      await this.orderNotificationRepository.findMany(params);

    return { orderNotifications };
  }
}
