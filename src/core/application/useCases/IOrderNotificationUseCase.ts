import {
  GetOrderNotificationsUseCaseProps,
  GetOrderNotificationsUseCaseResponse,
} from "./model/GetOrderNotificationsUseCaseModel";

export interface IOrderNotificationUseCase {
  getOrderNotifications(
    props: GetOrderNotificationsUseCaseProps
  ): Promise<GetOrderNotificationsUseCaseResponse>;
}
