import { Category } from "@/core/domain/entities/Category";
import { ICategoryRepository } from "@/core/domain/repositories/ICategoryRepository";

import { AttributeConflictError } from "./errors/AttributeConflictError";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import { ICategoryUseCase } from "./ICategoryUseCase";
import {
  CreateCategoryUseCaseRequestModel,
  CreateCategoryUseCaseResponseModel,
} from "./model/category/CreateCategoryUseCaseModel";
import {
  EditCategoryUseCaseRequestModel,
  EditCategoryUseCaseResponseModel,
} from "./model/category/EditCategoryUseCaseModel";
import {
  GetCategoriesUseCaseRequestModel,
  GetCategoriesUseCaseResponseModel,
} from "./model/category/GetCategoriesUseCaseModel";
import {
  GetCategoryByIdUseCaseRequestModel,
  GetCategoryByIdUseCaseResponseModel,
} from "./model/category/GetCategoryByIdUseCaseModel";

export class CategoryUseCase implements ICategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async getCategories({
    params,
  }: GetCategoriesUseCaseRequestModel): Promise<GetCategoriesUseCaseResponseModel> {
    const categories = await this.categoryRepository.findMany(params);

    return { categories };
  }

  async getCategoryById({
    id,
  }: GetCategoryByIdUseCaseRequestModel): Promise<GetCategoryByIdUseCaseResponseModel> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new ResourceNotFoundError("category");
    }

    return { category };
  }

  async createCategory({
    name,
  }: CreateCategoryUseCaseRequestModel): Promise<CreateCategoryUseCaseResponseModel> {
    const hasCategoryWithSameName =
      await this.categoryRepository.findByName(name);

    if (hasCategoryWithSameName) {
      throw new AttributeConflictError("name", "category");
    }

    const category = await this.categoryRepository.create(
      new Category({
        name,
      })
    );

    return { category };
  }

  async editCategory({
    id,
    name,
  }: EditCategoryUseCaseRequestModel): Promise<EditCategoryUseCaseResponseModel> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new ResourceNotFoundError("category");
    }

    const hasCategoryWithSameEmail =
      await this.categoryRepository.findByName(name);

    if (
      hasCategoryWithSameEmail &&
      hasCategoryWithSameEmail.id !== category.id
    ) {
      throw new AttributeConflictError("email", "category");
    }

    category.name = name;

    const updatedCategory = await this.categoryRepository.update(category);

    return { category: updatedCategory };
  }
}
