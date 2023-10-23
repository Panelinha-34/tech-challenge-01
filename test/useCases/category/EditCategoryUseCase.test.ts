import { beforeEach, describe, expect, it, vi } from "vitest";

import { CategoryUseCase } from "@/core/application/useCases/CategoryUseCase";
import { AttributeConflictError } from "@/core/application/useCases/errors/AttributeConflictError";
import { makeCategory } from "@test/factories/MakeCategory";
import { InMemoryCategoryRepository } from "@test/repositories/InMemoryCategoryRepository";

let inMemoryCategoriesRepository: InMemoryCategoryRepository;
let sut: CategoryUseCase;

describe("Given the Edit Category Use Case", () => {
  const name = "updated name";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryCategoriesRepository = new InMemoryCategoryRepository();

    sut = new CategoryUseCase(inMemoryCategoriesRepository);
  });

  it("should edit the category correctly", async () => {
    const createdCategory = makeCategory();

    inMemoryCategoriesRepository.items.push(createdCategory);

    await sut.editCategory({
      id: createdCategory.id.toString(),
      name,
    });

    expect(inMemoryCategoriesRepository.items[0]).toEqual(
      expect.objectContaining({
        name,
      })
    );
  });

  it("should throw an error when the informed 'name' already exists", async () => {
    const createdCategory = makeCategory({
      name,
    });
    const createdCategory2 = makeCategory({
      name: "name2",
    });

    inMemoryCategoriesRepository.items.push(createdCategory);
    inMemoryCategoriesRepository.items.push(createdCategory2);

    await expect(() =>
      sut.editCategory({
        id: createdCategory2.id.toString(),
        name,
      })
    ).rejects.toBeInstanceOf(AttributeConflictError);
  });
});
