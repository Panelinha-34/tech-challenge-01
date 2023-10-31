/* eslint-disable no-new */

import { OrderNotificationsPrismaRepository } from "@/adapter/driven/infra/prisma/repositories/OrderNotificationsPrismaRepository";
import { OrderNotificationUseCase } from "@/core/application/useCases/OrderNotificationUseCase";
import { UpdatedOrderStatusSubscriber } from "@/core/application/useCases/subscribers/UpdatedOrderStatusSubscriber";

export function orderSubscribers() {
  const orderNotificationRepository = new OrderNotificationsPrismaRepository();

  const orderNotificationUseCase = new OrderNotificationUseCase(
    orderNotificationRepository
  );

  new UpdatedOrderStatusSubscriber(orderNotificationUseCase);
}
