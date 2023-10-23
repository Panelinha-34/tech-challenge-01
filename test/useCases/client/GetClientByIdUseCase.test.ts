import { beforeEach, describe, expect, it, vi } from "vitest";

import { ClientUseCase } from "@/core/application/useCases/ClientUseCase";
import { ResourceNotFoundError } from "@/core/application/useCases/errors/ResourceNotFoundError";
import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { makeClient } from "@test/factories/MakeClient";
import { InMemoryClientRepository } from "@test/repositories/InMemoryClientRepository";

let inMemoryClientsRepository: InMemoryClientRepository;
let sut: ClientUseCase;

describe("Given the Get Clients By Id Use Case", () => {
  const id = "123";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryClientsRepository = new InMemoryClientRepository();

    sut = new ClientUseCase(inMemoryClientsRepository);
  });

  it("should return the client correctly", async () => {
    const client = makeClient({}, new UniqueEntityId(id));

    inMemoryClientsRepository.items.push(client);

    const { client: foundedClient } = await sut.getClientById({ id });

    expect(foundedClient).toEqual(
      expect.objectContaining({
        id: new UniqueEntityId(id),
      })
    );
  });

  it("should throw an error when the informed id does not exist", async () => {
    const client = makeClient({}, new UniqueEntityId(id));

    inMemoryClientsRepository.items.push(client);

    await expect(() => sut.getClientById({ id: "456" })).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
