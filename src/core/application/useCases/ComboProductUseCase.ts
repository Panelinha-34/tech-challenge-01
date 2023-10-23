import { ComboProduct } from "@/core/domain/entities/ComboProduct";
import { 
  IComboProductRepository 
} from "@/core/domain/repositories/IComboProductRepository";

import { AttributeConflictError } from "./errors/AttributeConflictError";

import {
  CreateComboProductUseCaseRequestModel,
  CreateComboProductUseCaseResponseModel
} from "./model/comboProduct/CreateComboProductUseCaseModel";
import { IComboProductUseCase } from './IComboProductUseCase';
import { GetComboProductsUseCaseRequestModel, GetComboProductsUseCaseResponseModel } from './model/comboProduct/GetComboProductsUseCaseModel';

export class ComboProductUseCase implements IComboProductUseCase {
  constructor(private comboProductRepository: IComboProductRepository) {}

  async getComboProducts({
    params,
  }: GetComboProductsUseCaseRequestModel): Promise<GetComboProductsUseCaseResponseModel> {
    const comboProducts = await this.comboProductRepository.findMany(params);

    return { comboProducts };
  }

  async createComboProduct({
    comboId,
    productId
  }: CreateComboProductUseCaseRequestModel): Promise<CreateComboProductUseCaseResponseModel> {
    const doesRelationshipAlreadyExists = 
      await this.comboProductRepository.findByProductIdAndComboId(
        productId,
        comboId 
      );

    if (doesRelationshipAlreadyExists) {
      throw new AttributeConflictError("comboAndProductId", "comboProduct");
    }

    const comboProduct = await this.comboProductRepository.create(
      new ComboProduct({
        comboId,
        productId
      })
    );

    return { comboProduct };
  }
}
