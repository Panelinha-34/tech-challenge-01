import { beforeEach, describe, expect, it, vi } from "vitest";

import { CategoryUseCase } from "@/core/application/useCases/CategoryUseCase";
import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { makeCategory } from "@test/factories/MakeCategory";
import { InMemoryCategoryRepository } from "@test/repositories/InMemoryCategoryRepository";

let inMemoryCategoriesRepository: InMemoryCategoryRepository;
let sut: CategoryUseCase;

describe("Given the Get Categories Use Case", () => {
  const page = 1;
  const size = 10;

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryCategoriesRepository = new InMemoryCategoryRepository();

    sut = new CategoryUseCase(inMemoryCategoriesRepository);
  });

  it("should return the categories correctly", async () => {
    const params = new PaginationParams(page, size);

    const categoryToCreate = makeCategory();

    inMemoryCategoriesRepository.items.push(categoryToCreate);

    const { categories } = await sut.getCategories({ params });

    expect(categories).toHaveLength(1);
  });

  it("should return the categories from the second pagination correctly", async () => {
    const params = new PaginationParams(2, size);

    Array.from({ length: 12 }).forEach(() => {
      inMemoryCategoriesRepository.items.push(makeCategory());
    });

    const { categories } = await sut.getCategories({ params });

    expect(categories).toHaveLength(2);
  });
});
