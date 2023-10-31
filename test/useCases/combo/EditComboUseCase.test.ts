import { beforeEach, describe, expect, it, vi } from "vitest";

import { ComboUseCase } from "@/core/application/useCases/ComboUseCase";
import { EntityNotActiveError } from "@/core/application/useCases/errors/EntityNotActiveError";
import { MinimumResourcesNotReached } from "@/core/application/useCases/errors/MinimumResourcesNotReached";
import { ResourceNotFoundError } from "@/core/application/useCases/errors/ResourceNotFoundError";
import { Product } from "@/core/domain/entities/Product";
import { CategoriesEnum } from "@/core/domain/enum/CategoriesEnum";
import { Category } from "@/core/domain/valueObjects/Category";
import { makeCombo } from "@test/repositories/factories/MakeCombo";
import { makeProduct } from "@test/repositories/factories/MakeProduct";
import { InMemoryComboProductRepository } from "@test/repositories/InMemoryComboProductRepository";
import { InMemoryComboRepository } from "@test/repositories/InMemoryComboRepository";
import { InMemoryProductRepository } from "@test/repositories/InMemoryProductRepository";

let inMemoryComboRepository: InMemoryComboRepository;
let inMemoryComboProductRepository: InMemoryComboProductRepository;
let inMemoryProductRepository: InMemoryProductRepository;
let sut: ComboUseCase;

describe("Given the Edit Combo Use Case", () => {
  const name = "updated name";

  let sandwich: Product;
  let drink: Product;

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryComboProductRepository = new InMemoryComboProductRepository();
    inMemoryComboRepository = new InMemoryComboRepository(
      inMemoryComboProductRepository
    );
    inMemoryProductRepository = new InMemoryProductRepository();

    sandwich = makeProduct({});
    drink = makeProduct({
      category: new Category({ name: CategoriesEnum.DRINK }),
    });

    inMemoryProductRepository.items.push(sandwich);
    inMemoryProductRepository.items.push(drink);

    sut = new ComboUseCase(inMemoryComboRepository, inMemoryProductRepository);
  });

  it("should edit the combo correctly", async () => {
    const createdCombo = makeCombo();

    inMemoryComboRepository.items.push(createdCombo);

    await sut.editCombo({
      id: createdCombo.id.toString(),
      name,
      sandwichId: sandwich.id.toString(),
      drinkId: drink.id.toString(),
    });

    expect(inMemoryComboRepository.items[0]).toEqual(
      expect.objectContaining({
        name,
        price: sandwich.price + drink.price,
      })
    );
  });

  it("should throw an error when not informed minimum 1 product", async () => {
    const createdCombo = makeCombo();

    inMemoryComboRepository.items.push(createdCombo);

    await expect(() =>
      sut.editCombo({
        id: createdCombo.id.toString(),
        name,
      })
    ).rejects.toBeInstanceOf(MinimumResourcesNotReached);
  });

  it("should throw an error when the informed product is not active", async () => {
    const product = makeProduct({
      active: false,
    });
    const createdCombo = makeCombo();

    inMemoryProductRepository.items.push(product);
    inMemoryComboRepository.items.push(createdCombo);

    await expect(() =>
      sut.editCombo({
        id: createdCombo.id.toString(),
        sandwichId: product.id.toString(),
      })
    ).rejects.toBeInstanceOf(EntityNotActiveError);
  });

  it("should throw an error when the informed product id does not exist", async () => {
    inMemoryProductRepository.items = [];

    await expect(() =>
      sut.createCombo({
        name,
        sandwichId: sandwich.id.toString(),
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
