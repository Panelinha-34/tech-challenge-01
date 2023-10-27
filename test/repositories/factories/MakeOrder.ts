/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Order, OrderProps } from "@/core/domain/entities/Order";
import { OrderStatusEnum } from "@/core/domain/enum/OrderStatusEnum";
import { OrderStatus } from "@/core/domain/valueObjects/OrderStatus";
import { faker } from "@faker-js/faker";

import { makeClient } from "./MakeClient";

export function makeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityId
): Order {
  const client = makeClient();

  const newOrder = new Order(
    {
      clientId: new UniqueEntityId(client.id.toString()),
      status: new OrderStatus({ name: OrderStatusEnum.IN_PREPARATION }),
      totalPrice: faker.number.float(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...override,
    },
    id
  );

  return newOrder;
}
