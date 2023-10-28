import { beforeEach, describe, expect, it, vi } from "vitest";

import { AttributeConflictError } from "@/core/application/useCases/errors/AttributeConflictError";
import { ProductUseCase } from "@/core/application/useCases/ProductUseCase";
import { makeProduct } from "@test/repositories/factories/MakeProduct";
import { InMemoryProductRepository } from "@test/repositories/InMemoryProductRepository";

let inMemoryProductRepository: InMemoryProductRepository;
let sut: ProductUseCase;

describe("Given the Edit Product Use Case", () => {
  const name = "updated name";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryProductRepository = new InMemoryProductRepository();

    sut = new ProductUseCase(inMemoryProductRepository);
  });

  it("should edit the product correctly", async () => {
    const createdProduct = makeProduct();

    inMemoryProductRepository.items.push(createdProduct);

    await sut.editProduct({
      id: createdProduct.id.toString(),
      name: "updated name",
    });

    expect(inMemoryProductRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "updated name",
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
