import { beforeEach, describe, expect, it, vi } from "vitest";

import { ComboUseCase } from "@/core/application/useCases/ComboUseCase";
import { EntityNotActiveError } from "@/core/application/useCases/errors/EntityNotActiveError";
import { MinimumResourcesNotReached } from "@/core/application/useCases/errors/MinimumResourcesNotReached";
import { ResourceNotFoundError } from "@/core/application/useCases/errors/ResourceNotFoundError";
import { CategoriesEnum } from "@/core/domain/enum/CategoriesEnum";
import { Category } from "@/core/domain/valueObjects/Category";
import { makeProduct } from "@test/repositories/factories/MakeProduct";
import { InMemoryComboProductRepository } from "@test/repositories/InMemoryComboProductRepository";
import { InMemoryComboRepository } from "@test/repositories/InMemoryComboRepository";
import { InMemoryProductRepository } from "@test/repositories/InMemoryProductRepository";

let inMemoryComboRepository: InMemoryComboRepository;
let inMemoryComboProductRepository: InMemoryComboProductRepository;
let inMemoryProductRepository: InMemoryProductRepository;
let sut: ComboUseCase;

describe("Given the Create Combo Use Case", () => {
  const name = "combo test";
  const description = "combo test";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryComboProductRepository = new InMemoryComboProductRepository();
    inMemoryComboRepository = new InMemoryComboRepository(
      inMemoryComboProductRepository
    );
    inMemoryProductRepository = new InMemoryProductRepository();

    sut = new ComboUseCase(inMemoryComboRepository, inMemoryProductRepository);
  });

  it("should create the combo correctly", async () => {
    const sandwich = makeProduct({});
    const drink = makeProduct({
      category: new Category({ name: CategoriesEnum.DRINK }),
    });

    inMemoryProductRepository.items.push(sandwich);
    inMemoryProductRepository.items.push(drink);

    const { combo } = await sut.createCombo({
      name,
      description,
      sandwichId: sandwich.id.toString(),
      drinkId: drink.id.toString(),
    });

    const createdCombo = inMemoryComboRepository.items[0];

    expect(createdCombo).toEqual(
      expect.objectContaining({
        name,
        price: sandwich.price + drink.price,
      })
    );

    expect(
      inMemoryComboProductRepository.items.filter((c) => c.comboId === combo.id)
    ).toHaveLength(2);
  });

  it("should throw an error when the informed product id does not exist", async () => {
    const sandwich = makeProduct({});

    await expect(() =>
      sut.createCombo({
        name,
        description,
        sandwichId: sandwich.id.toString(),
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should throw an error when the informed product is not active", async () => {
    const sandwich = makeProduct({
      active: false,
    });

    inMemoryProductRepository.items.push(sandwich);

    await expect(() =>
      sut.createCombo({
        name,
        description,
        sandwichId: sandwich.id.toString(),
      })
    ).rejects.toBeInstanceOf(EntityNotActiveError);
  });

  it("should throw an error when there are no products", async () => {
    await expect(() =>
      sut.createCombo({
        name,
        description,
      })
    ).rejects.toBeInstanceOf(MinimumResourcesNotReached);
  });
});
