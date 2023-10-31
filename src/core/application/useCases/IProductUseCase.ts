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
import {
  InactiveProductUseCaseRequestModel,
  InactiveProductUseCaseResponseModel,
} from "./model/product/InactiveProductUseCaseModel";

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

  inactiveProduct(
    props: InactiveProductUseCaseRequestModel
  ): Promise<InactiveProductUseCaseResponseModel>;
}
