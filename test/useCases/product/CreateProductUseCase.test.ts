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

describe("Given the Create Product Use Case", () => {
  const name = "hamburger";
  const description = "hamburguer com queijo e salada";
  const price = 9.50;

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryProductRepository = new InMemoryProductRepository();

    category = makeCategory();

    sut = new ProductUseCase(inMemoryProductRepository);
  });

  it("should create the product correctly", async () => {
    await sut.createProduct({
      name,
      description,
      price,
      categoryId: category.id.toString()
    });

    expect(
      inMemoryProductRepository.items.filter((c) => c.name === name)
    ).toHaveLength(1);
  });

  it("should throw an error when the informed 'name' already exists", async () => {
    const createdProduct = makeProduct({
      name,
    });

    inMemoryProductRepository.items.push(createdProduct);

    await expect(() =>
      sut.createProduct({
        name,
        description,
        price,
        categoryId: category.id.toString(),
      })
    ).rejects.toBeInstanceOf(AttributeConflictError);
  });
});
