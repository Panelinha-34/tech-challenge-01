import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { OrderNotification } from "@/core/domain/entities/OrderNotification";
import { NotificationStatusEnum } from "@/core/domain/enum/NotificationStatusEnum";
import { IOrderNotificationRepository } from "@/core/domain/repositories/IOrderNotificationRepository";
import { NotificationStatus } from "@/core/domain/valueObjects/NotificationStatus";

import { IOrderNotificationUseCase } from "./IOrderNotificationUseCase";
import {
  CreateOrderNotificationUseCaseRequestModel,
  CreateOrderNotificationUseCaseResponseModel,
} from "./model/orderNotification/CreateOrderNotificationUseCaseModel";
import {
  GetOrderNotificationsUseCaseRequestModel,
  GetOrderNotificationsUseCaseResponseModel,
} from "./model/orderNotification/GetOrderNotificationsUseCaseModel";

export class OrderNotificationUseCase implements IOrderNotificationUseCase {
  constructor(
    private orderNotificationRepository: IOrderNotificationRepository
  ) {}

  async createOrderNotification({
    clientId,
    orderId,
    message,
  }: CreateOrderNotificationUseCaseRequestModel): Promise<CreateOrderNotificationUseCaseResponseModel> {
    const orderNotification = new OrderNotification({
      clientId: new UniqueEntityId(clientId),
      orderId: new UniqueEntityId(orderId),
      status: new NotificationStatus({ name: NotificationStatusEnum.PENDING }),
      message,
    });

    const createdOrderNotification =
      await this.orderNotificationRepository.create(orderNotification);

    return { orderNotification: createdOrderNotification };
  }

  async getNotifications(
    props: GetOrderNotificationsUseCaseRequestModel
  ): Promise<GetOrderNotificationsUseCaseResponseModel> {
    const paginationResponse = await this.orderNotificationRepository.findMany(
      props.params
    );

    return { paginationResponse };
  }
}
