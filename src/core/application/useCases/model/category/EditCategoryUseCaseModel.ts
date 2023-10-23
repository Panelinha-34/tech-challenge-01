import { Category } from "@/core/domain/entities/Category";

export interface EditCategoryUseCaseRequestModel {
  id: string;
  name: string;
}

export interface EditCategoryUseCaseResponseModel {
  category: Category;
}
