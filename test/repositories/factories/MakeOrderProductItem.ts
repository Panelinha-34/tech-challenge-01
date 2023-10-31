/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import {
  OrderProductItem,
  OrderProductItemProps,
} from "@/core/domain/entities/OrderProductItem";
import { faker } from "@faker-js/faker";

export function makeOrderProductItem(
  override: Partial<OrderProductItemProps> = {},
  id?: UniqueEntityId
): OrderProductItem {
  const newOrder = new OrderProductItem(
    {
      orderId: new UniqueEntityId("orderId"),
      productId: new UniqueEntityId("productId"),
      quantity: faker.number.float(),
      annotation: faker.lorem.sentence(),
      totalPrice: faker.number.float(),
      ...override,
    },
    id
  );

  return newOrder;
}
