import { beforeEach, describe, expect, it, vi } from "vitest";

import { ComboUseCase } from "@/core/application/useCases/ComboUseCase";
import { ResourceNotFoundError } from "@/core/application/useCases/errors/ResourceNotFoundError";
import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { makeCombo } from "@test/factories/MakeCombo";
import { InMemoryComboRepository } from "@test/repositories/InMemoryComboRepository";

let inMemoryComboRepository: InMemoryComboRepository;
let sut: ComboUseCase;

describe("Given the Get Combo By Id Use Case", () => {
  const id = "123";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryComboRepository = new InMemoryComboRepository();

    sut = new ComboUseCase(inMemoryComboRepository);
  });

  it("should return the combo correctly", async () => {
    const combo = makeCombo({}, new UniqueEntityId(id));

    inMemoryComboRepository.items.push(combo);

    const { combo: foundedCombo } = await sut.getComboById({ id });

    expect(foundedCombo).toEqual(
      expect.objectContaining({
        id: new UniqueEntityId(id),
      })
    );
  });

  it("should throw an error when the informed id does not exist", async () => {
    const combo = makeCombo({}, new UniqueEntityId(id));

    inMemoryComboRepository.items.push(combo);

    await expect(() =>
      sut.getComboById({ id: "456" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
