import { Combo } from "@/core/domain/entities/Combo";
import { IComboRepository } from "@/core/domain/repositories/IComboRepository";

import { AttributeConflictError } from "./errors/AttributeConflictError";
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
  constructor(private comboRepository: IComboRepository) {}

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

    return { combo };
  }

  async createCombo({
    description,
    name,
    price,
  }: CreateComboUseCaseRequestModel): Promise<CreateComboUseCaseResponseModel> {
    const hasComboWithSameName = await this.comboRepository.findByName(name);

    if (hasComboWithSameName) {
      throw new AttributeConflictError("name", "combo");
    }

    const combo = await this.comboRepository.create(
      new Combo({
        name,
        price,
        description,
      })
    );

    return { combo };
  }

  async editCombo({
    id,
    description,
    name,
    price,
  }: EditComboUseCaseRequestModel): Promise<EditComboUseCaseResponseModel> {
    const combo = await this.comboRepository.findById(id);

    if (!combo) {
      throw new ResourceNotFoundError("combo");
    }

    if (name) {
      combo.name = name;
    }

    if (price) {
      combo.price = price;
    }

    if (description) {
      combo.description = description;
    }

    const updatedCombo = await this.comboRepository.update(combo);

    return { combo: updatedCombo };
  }
}
