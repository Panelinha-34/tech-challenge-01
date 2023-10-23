import { beforeEach, describe, expect, it, vi } from "vitest";

import { ComboProductUseCase } from "@/core/application/useCases/ComboProductUseCase";
import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { makeComboProduct } from "@test/factories/MakeComboProduct";
import { InMemoryComboProductRepository } from "@test/repositories/InMemoryComboProductRepository";

let inMemoryComboProductRepository: InMemoryComboProductRepository;
let sut: ComboProductUseCase;

describe("Given the Get ComboProducts Use Case", () => {
  const page = 1;
  const size = 10;

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryComboProductRepository = new InMemoryComboProductRepository();

    sut = new ComboProductUseCase(inMemoryComboProductRepository);
  });

  it("should return the comboProducts correctly", async () => {
    const params = new PaginationParams(page, size);

    const productToCreate = makeComboProduct();

    inMemoryComboProductRepository.items.push(productToCreate);

    const { comboProducts } = await sut.getComboProducts({ params });

    expect(comboProducts).toHaveLength(1);
  });

  it("should return the comboProducts from the second pagination correctly", async () => {
    const params = new PaginationParams(2, size);

    Array.from({ length: 12 }).forEach(() => {
      inMemoryComboProductRepository.items.push(makeComboProduct());
    });

    const { comboProducts } = await sut.getComboProducts({ params });

    expect(comboProducts).toHaveLength(2);
  });
});
