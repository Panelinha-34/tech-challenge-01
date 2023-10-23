import { beforeEach, describe, expect, it, vi } from "vitest";

import { ComboProductUseCase } from "@/core/application/useCases/ComboProductUseCase";
import { AttributeConflictError } from "@/core/application/useCases/errors/AttributeConflictError";
import { makeComboProduct } from "@test/factories/MakeComboProduct";
import { InMemoryComboProductRepository } from "@test/repositories/InMemoryComboProductRepository";
import { makeCombo } from '@test/factories/MakeCombo';
import { makeProduct } from '@test/factories/MakeProduct';

let inMemoryComboProductRepository: InMemoryComboProductRepository;
let sut: ComboProductUseCase;

describe("Given the Create ComboProduct Use Case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryComboProductRepository = new InMemoryComboProductRepository();

    sut = new ComboProductUseCase(inMemoryComboProductRepository);
  });

  it("should create the comboProduct correctly", async () => {
    const combo = makeCombo();
    const product = makeProduct();

    await sut.createComboProduct({
      comboId: combo.id.toString(),
      productId: product.id.toString()
    });

    expect(
      inMemoryComboProductRepository.items.filter((c) => 
        c.comboId === combo.id.toString() && c.productId === product.id.toString()
      )
    ).toHaveLength(1);
  });

  it("should throw an error when the informed 'comboId' and 'productId' already co-exists", async () => {
    const createdComboProduct = makeComboProduct();

    inMemoryComboProductRepository.items.push(createdComboProduct);

    await expect(() =>
      sut.createComboProduct({
        comboId: createdComboProduct.comboId,
        productId: createdComboProduct.productId,
      })
    ).rejects.toBeInstanceOf(AttributeConflictError);
  });
});
