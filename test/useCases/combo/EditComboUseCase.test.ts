import { beforeEach, describe, expect, it, vi } from "vitest";

import { ComboUseCase } from "@/core/application/useCases/ComboUseCase";
import { AttributeConflictError } from "@/core/application/useCases/errors/AttributeConflictError";
import { makeCombo } from "@test/factories/MakeCombo";
import { InMemoryComboRepository } from "@test/repositories/InMemoryComboRepository";

let inMemoryComboRepository: InMemoryComboRepository;
let sut: ComboUseCase;

describe("Given the Edit Combo Use Case", () => {
  const name = "updated name";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryComboRepository = new InMemoryComboRepository();

    sut = new ComboUseCase(inMemoryComboRepository);
  });

  it("should edit the combo correctly", async () => {
    const createdCombo = makeCombo();

    inMemoryComboRepository.items.push(createdCombo);

    await sut.editCombo({
      id: createdCombo.id.toString(),
      name,
    });

    expect(inMemoryComboRepository.items[0]).toEqual(
      expect.objectContaining({
        name,
      })
    );
  });

  it("should throw an error when the informed 'name' already exists", async () => {
    const createdCombo = makeCombo({
      name,
    });

    const createdCombo2 = makeCombo({
      name: "name2",
    });

    inMemoryComboRepository.items.push(createdCombo);
    inMemoryComboRepository.items.push(createdCombo2);

    await expect(() =>
      sut.editCombo({
        id: createdCombo2.id.toString(),
        name,
      })
    ).rejects.toBeInstanceOf(AttributeConflictError);
  });
});
