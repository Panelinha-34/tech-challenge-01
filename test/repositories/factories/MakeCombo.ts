/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Combo, ComboProps } from "@/core/domain/entities/Combo";
import { faker } from "@faker-js/faker";

export function makeCombo(
  override: Partial<ComboProps> = {},
  id?: UniqueEntityId
): Combo {
  const newCombo = new Combo(
    {
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: faker.number.float(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...override,
    },
    id
  );

  return newCombo;
}
