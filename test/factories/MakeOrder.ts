/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Client } from "@/core/domain/entities/Client";
import { Order, OrderProps } from "@/core/domain/entities/Order";
import { Taxvat } from "@/core/domain/valueObjects/Taxvat";
import { faker } from "@faker-js/faker";

enum OrderStatus {
  FINISHED = "Finished",
  WAITING_PAYMENT = "WAITING_PAYMENT",
  PAID = "PAID",
}

export function makeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityId
): Order {
  const newClient = new Client(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      taxVat: new Taxvat({ number: "12345678900" }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...override,
    },
    id
  );

  const newOrder = new Order({
    clientId: newClient.id.toString(),
    status: faker.helpers.enumValue(OrderStatus),
    totalPrice: faker.number.float(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  });

  return newOrder;
}
