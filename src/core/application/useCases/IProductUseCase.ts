import {
  CreateProductUseCaseRequestModel,
  CreateProductUseCaseResponseModel,
} from "./model/product/CreateProductUseCaseModel";
import {
  EditProductUseCaseRequestModel,
  EditProductUseCaseResponseModel,
} from "./model/product/EditProductUseCaseModel";
import {
  GetProductByIdUseCaseRequestModel,
  GetProductByIdUseCaseResponseModel,
} from "./model/product/GetProductByIdUseCaseModel";
import {
  GetProductsUseCaseRequestModel,
  GetProductsUseCaseResponseModel,
} from "./model/product/GetProductsUseCaseModel";

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
