/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import {
  OrderNotification,
  OrderNotificationProps,
} from "@/core/domain/entities/OrderNotification";
import { NotificationStatusEnum } from "@/core/domain/enum/NotificationStatusEnum";
import { NotificationStatus } from "@/core/domain/valueObjects/NotificationStatus";
import { faker } from "@faker-js/faker";

import { makeClient } from "./MakeClient";
import { makeOrder } from "./MakeOrder";

export function makeOrderNotification(
  override: Partial<OrderNotificationProps> = {},
  id?: UniqueEntityId
): OrderNotification {
  const order = makeOrder();
  const client = makeClient();

  const orderNotification = new OrderNotification(
    {
      message: faker.lorem.word(),
      status: new NotificationStatus({ name: NotificationStatusEnum.PENDING }),
      orderId: new UniqueEntityId(order.id.toString()),
      clientId: new UniqueEntityId(client.id.toString()),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...override,
    },
    id
  );

  return orderNotification;
}
