import { Category } from "@/core/domain/entities/Category";

export interface GetCategoryByIdUseCaseRequestModel {
  id: string;
}

export interface GetCategoryByIdUseCaseResponseModel {
  category: Category;
}
