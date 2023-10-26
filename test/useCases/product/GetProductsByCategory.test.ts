import { beforeEach, describe, expect, it, vi } from "vitest";

import { ProductUseCase } from "@/core/application/useCases/ProductUseCase";
import { UnsupportedArgumentValueError } from "@/core/domain/base/error/UnsupportedArgumentValueError";
import { CategoriesEnum } from "@/core/domain/enum/CategoriesEnum";
import { Category } from "@/core/domain/valueObjects/Category";
import { makeProduct } from "@test/factories/MakeProduct";
import { InMemoryProductRepository } from "@test/repositories/InMemoryProductRepository";

let inMemoryProductRepository: InMemoryProductRepository;
let sut: ProductUseCase;

describe("Given the Get Products Use Case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryProductRepository = new InMemoryProductRepository();

    sut = new ProductUseCase(inMemoryProductRepository);
  });

  it("should return the filtered products correctly", async () => {
    const productOne = makeProduct({
      category: new Category({ name: CategoriesEnum.DESSERT }),
    });

    const productTwo = makeProduct({
      category: new Category({ name: CategoriesEnum.DESSERT }),
    });

    inMemoryProductRepository.items.push(productOne);
    inMemoryProductRepository.items.push(productTwo);

    const { products } = await sut.getProductsByCategory({
      category: "dessert",
    });

    expect(products).toHaveLength(2);
  });

  it("should return an empty products list", async () => {
    const productOne = makeProduct({
      category: new Category({ name: CategoriesEnum.DESSERT }),
    });

    const productTwo = makeProduct({
      category: new Category({ name: CategoriesEnum.SIDE_DISH }),
    });

    const productThree = makeProduct({
      category: new Category({ name: CategoriesEnum.DRINK }),
    });

    inMemoryProductRepository.items.push(productOne);
    inMemoryProductRepository.items.push(productTwo);
    inMemoryProductRepository.items.push(productThree);

    const { products } = await sut.getProductsByCategory({
      category: "sandwich",
    });

    expect(products).toHaveLength(0);
  });

  it("should throw error with non-existing category", async () => {
    const productOne = makeProduct({
      category: new Category({ name: CategoriesEnum.DESSERT }),
    });

    inMemoryProductRepository.items.push(productOne);

    await expect(() =>
      sut.getProductsByCategory({
        category: "non-existing-category",
      })
    ).rejects.toBeInstanceOf(UnsupportedArgumentValueError);
  });
});
