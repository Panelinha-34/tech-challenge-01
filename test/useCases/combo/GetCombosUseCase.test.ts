import { beforeEach, describe, expect, it, vi } from "vitest";

import { ComboUseCase } from "@/core/application/useCases/ComboUseCase";
import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { makeCombo } from "@test/repositories/factories/MakeCombo";
import { InMemoryComboProductRepository } from "@test/repositories/InMemoryComboProductRepository";
import { InMemoryComboRepository } from "@test/repositories/InMemoryComboRepository";
import { InMemoryProductRepository } from "@test/repositories/InMemoryProductRepository";

let inMemoryComboRepository: InMemoryComboRepository;
let inMemoryComboProductRepository: InMemoryComboProductRepository;
let inMemoryProductRepository: InMemoryProductRepository;
let sut: ComboUseCase;

describe("Given the Get Combos Use Case", () => {
  const page = 1;
  const size = 10;

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryComboProductRepository = new InMemoryComboProductRepository();
    inMemoryComboRepository = new InMemoryComboRepository(
      inMemoryComboProductRepository
    );
    inMemoryProductRepository = new InMemoryProductRepository();

    sut = new ComboUseCase(inMemoryComboRepository, inMemoryProductRepository);
  });

  it("should return the combos correctly", async () => {
    const params = new PaginationParams(page, size);

    const comboToCreate = makeCombo();

    inMemoryComboRepository.items.push(comboToCreate);

    const { paginationResponse } = await sut.getCombos({ params });

    const combos = paginationResponse.data;

    expect(combos).toHaveLength(1);
  });

  it("should return the combos from the second pagination correctly", async () => {
    const params = new PaginationParams(2, size);

    Array.from({ length: 12 }).forEach(() => {
      inMemoryComboRepository.items.push(makeCombo());
    });

    const { paginationResponse } = await sut.getCombos({ params });

    const combos = paginationResponse.data;

    expect(combos).toHaveLength(2);
  });
});
