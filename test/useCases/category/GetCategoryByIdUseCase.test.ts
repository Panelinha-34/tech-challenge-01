import { beforeEach, describe, expect, it, vi } from "vitest";

import { CategoryUseCase } from "@/core/application/useCases/CategoryUseCase";
import { ResourceNotFoundError } from "@/core/application/useCases/errors/ResourceNotFoundError";
import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { makeCategory } from "@test/factories/MakeCategory";
import { InMemoryCategoryRepository } from "@test/repositories/InMemoryCategoryRepository";

let inMemoryCategoriesRepository: InMemoryCategoryRepository;
let sut: CategoryUseCase;

describe("Given the Get Categories By Id Use Case", () => {
  const id = "123";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryCategoriesRepository = new InMemoryCategoryRepository();

    sut = new CategoryUseCase(inMemoryCategoriesRepository);
  });

  it("should return the category correctly", async () => {
    const category = makeCategory({}, new UniqueEntityId(id));

    inMemoryCategoriesRepository.items.push(category);

    const { category: foundedCategory } = await sut.getCategoryById({ id });

    expect(foundedCategory).toEqual(
      expect.objectContaining({
        id: new UniqueEntityId(id),
      })
    );
  });

  it("should throw an error when the informed id does not exist", async () => {
    const category = makeCategory({}, new UniqueEntityId(id));

    inMemoryCategoriesRepository.items.push(category);

    await expect(() =>
      sut.getCategoryById({ id: "456" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
