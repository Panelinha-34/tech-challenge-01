import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Category } from "@/core/domain/entities/Category";

export interface GetCategoriesUseCaseRequestModel {
  params: PaginationParams;
}

export interface GetCategoriesUseCaseResponseModel {
  categories: Category[];
}
