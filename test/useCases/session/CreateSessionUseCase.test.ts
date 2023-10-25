import { beforeEach, describe, expect, it, vi } from "vitest";

import { ResourceNotFoundError } from "@/core/application/useCases/errors/ResourceNotFoundError";
import { SessionUseCase } from "@/core/application/useCases/SessionUseCase";
import { Taxvat } from "@/core/domain/valueObjects/Taxvat";
import { makeClient } from "@test/factories/MakeClient";
import { InMemoryClientRepository } from "@test/repositories/InMemoryClientRepository";
import { InMemorySessionRepository } from "@test/repositories/InMemorySessionRepository";

let inMemoryClientsRepository: InMemoryClientRepository;
let inMemorySessionRepository: InMemorySessionRepository;
let sut: SessionUseCase;

describe("Given the Create Session Use Case", () => {
  const taxVat = "012345678-9";
  const name = "John Doe";
  const email = "john@doe.com";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryClientsRepository = new InMemoryClientRepository();
    inMemorySessionRepository = new InMemorySessionRepository();

    sut = new SessionUseCase(
      inMemorySessionRepository,
      inMemoryClientsRepository
    );
  });

  it("should return a session with the correct user identified by tax vat number", async () => {
    const client = makeClient({
      taxVat: new Taxvat({ number: taxVat }),
      name,
      email,
    });

    inMemoryClientsRepository.items.push(client);

    const { session } = await sut.createSession({ taxVat });

    expect(session.client.id).toEqual(client.id);
  });

  it("should throw an error when trying to create a session with a user not registered", async () => {
    const client = makeClient({
      taxVat: new Taxvat({ number: taxVat }),
      name,
      email,
    });

    inMemoryClientsRepository.items.push(client);

    await expect(() =>
      sut.createSession({ taxVat: "000" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
