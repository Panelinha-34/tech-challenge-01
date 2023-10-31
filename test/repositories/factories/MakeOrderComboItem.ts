/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import {
  OrderComboItem,
  OrderComboItemProps,
} from "@/core/domain/entities/OrderComboItem";
import { faker } from "@faker-js/faker";

export function makeOrderComboItem(
  override: Partial<OrderComboItemProps> = {},
  id?: UniqueEntityId
): OrderComboItem {
  const newOrder = new OrderComboItem(
    {
      orderId: new UniqueEntityId("orderId"),
      comboId: new UniqueEntityId("comboId"),
      quantity: faker.number.float(),
      annotation: faker.lorem.sentence(),
      totalPrice: faker.number.float(),
      ...override,
    },
    id
  );

  return newOrder;
}
