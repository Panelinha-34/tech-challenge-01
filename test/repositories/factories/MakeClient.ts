/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Client, ClientProps } from "@/core/domain/entities/Client";
import { Taxvat } from "@/core/domain/valueObjects/Taxvat";
import { faker } from "@faker-js/faker";

export function makeClient(
  override: Partial<ClientProps> = {},
  id?: UniqueEntityId
): Client {
  const newClient = new Client(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      taxVat: new Taxvat({ number: "12345678900" }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...override,
    },
    id
  );

  return newClient;
}
