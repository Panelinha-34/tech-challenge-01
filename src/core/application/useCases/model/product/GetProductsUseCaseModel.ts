import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Product } from "@/core/domain/entities/Product";

export interface GetProductsUseCaseRequestModel {
  params: PaginationParams;
}

export interface GetProductsUseCaseResponseModel {
  products: Product[];
}
