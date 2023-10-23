import { beforeEach, describe, expect, it, vi } from "vitest";

import { ComboProductUseCase } from "@/core/application/useCases/ComboProductUseCase";
import { makeComboProduct } from "@test/factories/MakeComboProduct";
import { InMemoryComboProductRepository } from "@test/repositories/InMemoryComboProductRepository";
import { ResourceNotFoundError } from '@/core/application/useCases/errors/ResourceNotFoundError';

let inMemoryComboProductRepository: InMemoryComboProductRepository;
let sut: ComboProductUseCase;

describe("Given the Delete ComboProducts Use Case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryComboProductRepository = new InMemoryComboProductRepository();

    sut = new ComboProductUseCase(inMemoryComboProductRepository);
  });

  it("should delete the comboProduct correctly", async () => {
    const comboProductToCreate = makeComboProduct();

    inMemoryComboProductRepository.items.push(comboProductToCreate);

    expect(inMemoryComboProductRepository.items).toHaveLength(1);
    
    await sut.deleteComboProduct({ id: comboProductToCreate.id.toString() });

    expect(inMemoryComboProductRepository.items).toHaveLength(0);
  });

  it("should not delete comboProduct if does not exist", async () => {
    await expect(() =>
      sut.deleteComboProduct({
        id: "non-existing-id"
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
