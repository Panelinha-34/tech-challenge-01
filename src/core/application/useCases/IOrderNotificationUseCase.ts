import {
  GetOrderNotificationsUseCaseRequestModel,
  GetOrderNotificationsUseCaseResponseModel,
} from "./model/orderNotification/GetOrderNotificationsUseCaseModel";

export interface IOrderNotificationUseCase {
  getOrderNotifications(
    props: GetOrderNotificationsUseCaseRequestModel
  ): Promise<GetOrderNotificationsUseCaseResponseModel>;
}
