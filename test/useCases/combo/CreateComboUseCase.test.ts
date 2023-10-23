import { beforeEach, describe, expect, it, vi } from "vitest";

import { ComboUseCase } from "@/core/application/useCases/ComboUseCase";
import { AttributeConflictError } from "@/core/application/useCases/errors/AttributeConflictError";
import { makeCombo } from "@test/factories/MakeCombo";
import { InMemoryComboRepository } from "@test/repositories/InMemoryComboRepository";

let inMemoryComboRepository: InMemoryComboRepository;
let sut: ComboUseCase;

describe("Given the Create Combo Use Case", () => {
  const name = "hamburger";
  const description = "hamburguer com queijo e salada";
  const price = 9.50;

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryComboRepository = new InMemoryComboRepository();

    sut = new ComboUseCase(inMemoryComboRepository);
  });

  it("should create the combo correctly", async () => {
    await sut.createCombo({
      name,
      description,
      price,
    });

    expect(
      inMemoryComboRepository.items.filter((c) => c.name === name)
    ).toHaveLength(1);
  });

  it("should throw an error when the informed 'name' already exists", async () => {
    const createdCombo = makeCombo({
      name,
    });

    inMemoryComboRepository.items.push(createdCombo);

    await expect(() =>
      sut.createCombo({
        name,
        description,
        price,
      })
    ).rejects.toBeInstanceOf(AttributeConflictError);
  });
});
