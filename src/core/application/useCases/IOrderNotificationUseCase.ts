import {
  CreateOrderNotificationUseCaseRequestModel,
  CreateOrderNotificationUseCaseResponseModel,
} from "./model/orderNotification/CreateOrderNotificationUseCaseModel";
import {
  GetOrderNotificationsUseCaseRequestModel,
  GetOrderNotificationsUseCaseResponseModel,
} from "./model/orderNotification/GetOrderNotificationsUseCaseModel";

export interface IOrderNotificationUseCase {
  getNotifications(
    props: GetOrderNotificationsUseCaseRequestModel
  ): Promise<GetOrderNotificationsUseCaseResponseModel>;

  createOrderNotification(
    props: CreateOrderNotificationUseCaseRequestModel
  ): Promise<CreateOrderNotificationUseCaseResponseModel>;
}
