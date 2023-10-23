import { Category } from "@/core/domain/entities/Category";

export interface CreateCategoryUseCaseRequestModel {
  name: string;
}

export interface CreateCategoryUseCaseResponseModel {
  category: Category;
}
