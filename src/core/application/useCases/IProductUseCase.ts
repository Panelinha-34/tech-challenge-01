import {
  CreateProductUseCaseRequestModel,
  CreateProductUseCaseResponseModel,
} from "./model/product/CreateProductUseCaseModel";
import {
  GetProductsUseCaseRequestModel,
  GetProductsUseCaseResponseModel,
} from "./model/product/GetProductsUseCaseModel";
import {
  GetProductByIdUseCaseRequestModel,
  GetProductByIdUseCaseResponseModel,
} from "./model/product/GetProductByIdUseCaseModel";
import {
  EditProductUseCaseRequestModel,
  EditProductUseCaseResponseModel,
} from "./model/product/EditProductUseCaseModel";

export interface IProductUseCase {
  getProducts(
    props: GetProductsUseCaseRequestModel
  ): Promise<GetProductsUseCaseResponseModel>;

  getProductById(
    props: GetProductByIdUseCaseRequestModel
  ): Promise<GetProductByIdUseCaseResponseModel>;

  createProduct(
    props: CreateProductUseCaseRequestModel
  ): Promise<CreateProductUseCaseResponseModel>;

  editProduct(
    props: EditProductUseCaseRequestModel
  ): Promise<EditProductUseCaseResponseModel>;
}
