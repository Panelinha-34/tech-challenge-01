/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import { Combo } from "@/core/domain/entities/Combo";
import { ComboProduct } from "@/core/domain/entities/ComboProduct";
import { CategoriesEnum } from "@/core/domain/enum/CategoriesEnum";
import { IComboProductRepository } from "@/core/domain/repositories/IComboProductRepository";
import { IComboRepository } from "@/core/domain/repositories/IComboRepository";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { Category } from "@/core/domain/valueObjects/Category";

import { MinimumComboProductsNotReached } from "./errors/MinimumComboProductsNotReached";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import { IComboUseCase } from "./IComboUseCase";
import {
  CreateComboUseCaseRequestModel,
  CreateComboUseCaseResponseModel,
} from "./model/combo/CreateComboUseCaseModel";
import {
  EditComboUseCaseRequestModel,
  EditComboUseCaseResponseModel,
} from "./model/combo/EditComboUseCaseModel";
import {
  GetComboByIdUseCaseRequestModel,
  GetComboByIdUseCaseResponseModel,
} from "./model/combo/GetComboByIdUseCaseModel";
import {
  GetCombosUseCaseRequestModel,
  GetCombosUseCaseResponseModel,
} from "./model/combo/GetCombosUseCaseModel";

export class ComboUseCase implements IComboUseCase {
  constructor(
    private comboRepository: IComboRepository,
    private comboProductRepository: IComboProductRepository,
    private productRepository: IProductRepository
  ) {}

  async getCombos({
    params,
  }: GetCombosUseCaseRequestModel): Promise<GetCombosUseCaseResponseModel> {
    const combos = await this.comboRepository.findMany(params);

    return { combos };
  }

  async getComboById({
    id,
  }: GetComboByIdUseCaseRequestModel): Promise<GetComboByIdUseCaseResponseModel> {
    const combo = await this.comboRepository.findById(id);

    if (!combo) {
      throw new ResourceNotFoundError("combo");
    }

    const products = await this.comboProductRepository.findManyByComboID(
      combo.id.toString()
    );

    const productIds = products.map((p) => p.productId.toString());

    const productDetails =
      await this.productRepository.findManyByIds(productIds);

    return { combo, productDetails };
  }

  async createCombo({
    description,
    name,
    sandwichId,
    drinkId,
    sideId,
    dessertId,
  }: CreateComboUseCaseRequestModel): Promise<CreateComboUseCaseResponseModel> {
    const productIds = [sandwichId, drinkId, sideId, dessertId].filter(
      (p): p is string => !!p
    );

    const hasMinProducts = productIds.length >= 1;

    if (!hasMinProducts) {
      throw new MinimumComboProductsNotReached();
    }

    const productMap: Record<string, CategoriesEnum> = {};

    if (sandwichId) productMap[sandwichId] = CategoriesEnum.SANDWICH;
    if (drinkId) productMap[drinkId] = CategoriesEnum.DRINK;
    if (sideId) productMap[sideId] = CategoriesEnum.SIDE_DISH;
    if (dessertId) productMap[dessertId] = CategoriesEnum.DESSERT;

    for (const id of productIds) {
      const productCategory = new Category({ name: productMap[id] });
      const product = await this.productRepository.findByIdAndCategory(
        id,
        productCategory
      );

      if (!product) {
        throw new ResourceNotFoundError(productMap[id].toLowerCase());
      }
    }

    const productDetails =
      await this.productRepository.findManyByIds(productIds);

    const comboPrice = productDetails.reduce(
      (total, product) => total + product.price,
      0
    );

    const combo = await this.comboRepository.create(
      new Combo({
        price: comboPrice,
        name,
        description,
      })
    );

    const comboProducts = productDetails
      .map((p) => p.id)
      .map(
        (id) =>
          new ComboProduct({
            comboId: combo.id.toString(),
            productId: id.toString(),
          })
      );

    await this.comboProductRepository.createMany(comboProducts);

    return { combo, productDetails };
  }

  async editCombo({
    id,
    description,
    name,
    sandwichId,
    drinkId,
    sideId,
    dessertId,
  }: EditComboUseCaseRequestModel): Promise<EditComboUseCaseResponseModel> {
    const combo = await this.comboRepository.findById(id);

    if (!combo) {
      throw new ResourceNotFoundError("combo");
    }

    const productIds = [sandwichId, drinkId, sideId, dessertId].filter(
      (p): p is string => !!p
    );

    const hasMinProducts = productIds.length >= 1;

    if (!hasMinProducts) {
      throw new MinimumComboProductsNotReached();
    }

    const productMap: Record<string, CategoriesEnum> = {};

    if (sandwichId) productMap[sandwichId] = CategoriesEnum.SANDWICH;
    if (drinkId) productMap[drinkId] = CategoriesEnum.DRINK;
    if (sideId) productMap[sideId] = CategoriesEnum.SIDE_DISH;
    if (dessertId) productMap[dessertId] = CategoriesEnum.DESSERT;

    for (const productId of productIds) {
      const productCategory = new Category({ name: productMap[productId] });
      const product = await this.productRepository.findByIdAndCategory(
        productId,
        productCategory
      );

      if (!product) {
        throw new ResourceNotFoundError(productMap[productId].toLowerCase());
      }
    }

    const productDetails =
      await this.productRepository.findManyByIds(productIds);

    const comboPrice = productDetails.reduce(
      (total, product) => total + product.price,
      0
    );

    combo.price = comboPrice;

    if (name) combo.name = name;
    if (description) combo.description = description;

    await this.comboRepository.update(combo);

    await this.comboProductRepository.deleteByComboId(combo.id.toString());

    const comboProducts = productDetails
      .map((p) => p.id)
      .map(
        (pId) =>
          new ComboProduct({
            comboId: combo.id.toString(),
            productId: pId.toString(),
          })
      );

    await this.comboProductRepository.createMany(comboProducts);

    return { combo, productDetails };
  }
}
