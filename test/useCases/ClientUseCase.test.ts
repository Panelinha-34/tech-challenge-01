import { beforeEach, describe, expect, it, vi } from "vitest";

import { ClientUseCase } from "@/core/application/useCases/ClientUseCase";
import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { makeClient } from "@test/factories/MakeClient";
import { InMemoryClientRepository } from "@test/repositories/InMemoryClientRepository";

let inMemoryClientsRepository: InMemoryClientRepository;
let sut: ClientUseCase;

describe("Given the User Use Case", () => {
  const page = 1;
  const size = 10;

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryClientsRepository = new InMemoryClientRepository();

    sut = new ClientUseCase(inMemoryClientsRepository);
  });

  it("should return the clients correctly", async () => {
    const params = new PaginationParams(page, size);

    const clientToCreate = makeClient();

    inMemoryClientsRepository.items.push(clientToCreate);

    const { clients } = await sut.getClients({ params });

    expect(clients).toHaveLength(1);
  });

  it("should return the clients from the second pagination correctly", async () => {
    const params = new PaginationParams(2, size);

    Array.from({ length: 12 }).forEach(() => {
      inMemoryClientsRepository.items.push(makeClient());
    });

    const { clients } = await sut.getClients({ params });

    expect(clients).toHaveLength(2);
  });
});
