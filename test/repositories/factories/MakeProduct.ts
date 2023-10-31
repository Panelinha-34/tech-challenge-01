/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Product, ProductProps } from "@/core/domain/entities/Product";
import { CategoriesEnum } from "@/core/domain/enum/CategoriesEnum";
import { Category } from "@/core/domain/valueObjects/Category";
import { faker } from "@faker-js/faker";

export function makeProduct(
  override: Partial<ProductProps> = {},
  id?: UniqueEntityId
): Product {
  const newProduct = new Product(
    {
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: faker.number.float(),
      active: true,
      category:
        override.category ?? new Category({ name: CategoriesEnum.SANDWICH }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...override,
    },
    id
  );

  return newProduct;
}
