import { beforeEach, describe, expect, it, vi } from "vitest";

import { ProductUseCase } from "@/core/application/useCases/ProductUseCase";
import { AttributeConflictError } from "@/core/application/useCases/errors/AttributeConflictError";
import { makeProduct } from "@test/factories/MakeProduct";
import { InMemoryProductRepository } from "@test/repositories/InMemoryProductRepository";
import { Category } from '@/core/domain/entities/Category';
import { makeCategory } from '@test/factories/MakeCategory';

let inMemoryProductRepository: InMemoryProductRepository;
let sut: ProductUseCase;

let category: Category;

describe("Given the Edit Product Use Case", () => {
  const name = "updated name";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryProductRepository = new InMemoryProductRepository();

    category = makeCategory();

    sut = new ProductUseCase(inMemoryProductRepository);
  });

  it("should edit the product correctly", async () => {
    const createdProduct = makeProduct();

    inMemoryProductRepository.items.push(createdProduct);

    await sut.editProduct({
      id: createdProduct.id.toString(),
      name,
    });

    expect(inMemoryProductRepository.items[0]).toEqual(
      expect.objectContaining({
        name,
      })
    );
  });

  it("should throw an error when the informed 'name' already exists", async () => {
    const createdProduct = makeProduct({
      name,
    });

    const createdProduct2 = makeProduct({
      name: "name2",
    });

    inMemoryProductRepository.items.push(createdProduct);
    inMemoryProductRepository.items.push(createdProduct2);

    await expect(() =>
      sut.editProduct({
        id: createdProduct2.id.toString(),
        name,
      })
    ).rejects.toBeInstanceOf(AttributeConflictError);
  });
});
