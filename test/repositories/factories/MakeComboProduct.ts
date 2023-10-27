/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import {
  ComboProduct,
  ComboProductProps,
} from "@/core/domain/entities/ComboProduct";
import { faker } from "@faker-js/faker";

import { makeCombo } from "./MakeCombo";
import { makeProduct } from "./MakeProduct";

export function makeComboProduct(
  override: Partial<ComboProductProps> = {},
  id?: UniqueEntityId
): ComboProduct {
  const combo = makeCombo();
  const product = makeProduct();

  const newProduct = new ComboProduct(
    {
      comboId: new UniqueEntityId(combo.id.toString()),
      productId: new UniqueEntityId(product.id.toString()),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...override,
    },
    id
  );

  return newProduct;
}
