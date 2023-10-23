/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Product, ProductProps } from "@/core/domain/entities/Product";
import { faker } from "@faker-js/faker";
import { makeCategory } from './MakeCategory';

export function makeProduct(
  override: Partial<ProductProps> = {},
  id?: UniqueEntityId
): Product {
  const category = makeCategory();

  const newProduct = new Product(
    {
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: faker.number.float(),
      categoryId: category.id.toString(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...override,
    },
    id
  );

  return newProduct;
}
