/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import {
  OrderNotification,
  OrderNotificationProps,
} from "@/core/domain/entities/OrderNotification";
import { faker } from "@faker-js/faker";
import { makeOrder } from "./MakeOrder";

export function makeOrderNotification(
  override: Partial<OrderNotificationProps> = {},
  id?: UniqueEntityId
): OrderNotification {
  const order = makeOrder();

  const orderNotification = new OrderNotification(
    {
      message: faker.lorem.word(),
      status: order.status,
      orderId: order.id.toString(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...override,
    },
    id
  );

  return orderNotification;
}
