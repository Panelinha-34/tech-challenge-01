import { beforeEach, describe, expect, it, vi } from "vitest";

import { CategoryUseCase } from "@/core/application/useCases/CategoryUseCase";
import { AttributeConflictError } from "@/core/application/useCases/errors/AttributeConflictError";
import { makeCategory } from "@test/factories/MakeCategory";
import { InMemoryCategoryRepository } from "@test/repositories/InMemoryCategoryRepository";

let inMemoryCategoriesRepository: InMemoryCategoryRepository;
let sut: CategoryUseCase;

describe("Given the Create Category Use Case", () => {
  const name = "hamburger";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryCategoriesRepository = new InMemoryCategoryRepository();

    sut = new CategoryUseCase(inMemoryCategoriesRepository);
  });

  it("should create the category correctly", async () => {
    await sut.createCategory({
      name,
    });

    expect(
      inMemoryCategoriesRepository.items.filter((c) => c.name === name)
    ).toHaveLength(1);
  });

  it("should throw an error when the informed 'name' already exists", async () => {
    const createdCategory = makeCategory({
      name,
    });

    inMemoryCategoriesRepository.items.push(createdCategory);

    await expect(() =>
      sut.createCategory({
        name,
      })
    ).rejects.toBeInstanceOf(AttributeConflictError);
  });
});
