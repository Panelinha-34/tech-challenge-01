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

export interface ICategoryUseCase {
  getCategories(
    props: GetCategoriesUseCaseRequestModel
  ): Promise<GetCategoriesUseCaseResponseModel>;

  getCategoryById(
    props: GetCategoryByIdUseCaseRequestModel
  ): Promise<GetCategoryByIdUseCaseResponseModel>;

  createCategory(
    props: CreateCategoryUseCaseRequestModel
  ): Promise<CreateCategoryUseCaseResponseModel>;

  editCategory(
    props: EditCategoryUseCaseRequestModel
  ): Promise<EditCategoryUseCaseResponseModel>;
}
