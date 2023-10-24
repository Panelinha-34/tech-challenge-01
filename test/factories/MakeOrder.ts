/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Client } from "@/core/domain/entities/Client";
import { Order, OrderProps } from "@/core/domain/entities/Order";
import { Taxvat } from "@/core/domain/valueObjects/Taxvat";
import { faker } from "@faker-js/faker";
import { makeClient } from "./MakeClient";

enum OrderStatus {
  FINISHED = "Finished",
  WAITING_PAYMENT = "WAITING_PAYMENT",
  PAID = "PAID",
}

export function makeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityId
): Order {
  const client = makeClient();

  const newOrder = new Order(
    {
      clientId: client.id.toString(),
      status: faker.helpers.enumValue(OrderStatus),
      totalPrice: faker.number.float(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...override,
    },
    id
  );

  return newOrder;
}
