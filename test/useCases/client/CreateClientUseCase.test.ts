import { beforeEach, describe, expect, it, vi } from "vitest";

import { ClientUseCase } from "@/core/application/useCases/ClientUseCase";
import { InMemoryClientRepository } from "@test/repositories/InMemoryClientRepository";

let inMemoryClientsRepository: InMemoryClientRepository;
let sut: ClientUseCase;

describe("Given the Create Client Use Case", () => {
  const name = "john doe";
  const email = "john.doe@test.com";
  const taxVat = "1231231231";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryClientsRepository = new InMemoryClientRepository();

    sut = new ClientUseCase(inMemoryClientsRepository);
  });

  it("should create the client correctly", async () => {
    await sut.createClient({
      name,
      email,
      taxVat,
    });

    expect(
      inMemoryClientsRepository.items.filter((c) => c.taxVat.number === taxVat)
    ).toHaveLength(1);
  });
});
