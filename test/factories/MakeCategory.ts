/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Category, CategoryProps } from "@/core/domain/entities/Category";
import { faker } from "@faker-js/faker";

export function makeCategory(
  override: Partial<CategoryProps> = {},
  id?: UniqueEntityId
): Category {
  const newCategory = new Category(
    {
      name: faker.person.fullName(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...override,
    },
    id
  );

  return newCategory;
}
