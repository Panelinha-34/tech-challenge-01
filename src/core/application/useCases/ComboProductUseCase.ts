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
import { DeleteComboProductUseCaseRequestModel } from './model/comboProduct/DeleteComboProductUseCaseModel';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';

export class ComboProductUseCase implements IComboProductUseCase {
  constructor(private comboProductRepository: IComboProductRepository) {}

  async deleteComboProduct(
    { id }: DeleteComboProductUseCaseRequestModel
  ): Promise<void> {
    const relationshipExists = 
      await this.comboProductRepository.findById(id);

    if (!relationshipExists) {
      throw new ResourceNotFoundError("comboProduct");
    }

    await this.comboProductRepository.delete(id);
  }

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
